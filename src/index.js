/*

Name: Soap the Discord Bot
Author: Abhimanyu Chaudhary
Date: 2024-07-26
Description: A discord bot that detects and removes any messages in a 
             Discord server containing swear words or obscene language. 
             It logs all profanity and reprimands the user who sent the message.

*/

//########################################################################################


// This is where we import the necessary modules and packages

const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');

// This is where we create an new instance of the Mongo Client for our database
// and connect to the database using the URI located in the .env file
const monClient = new MongoClient(process.env.URI);


// This is where we declare the swearWords array

let swearWords = [];


// This is where we read the words.txt file and 
// populate the swearWords array with the words
// contained in the file

fs.readFile('src/words.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('error reading file', err);
        return;
    }
    swearWords = data.split('\r\n');



// We immediately call the loginClient function 
// to log in the bot to Discord but only after the 
// swearWords array has been populated

    loginClient();
});



// Here we define the specific intents that the bot will
// use to interact with the Discord server

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent 
    ]});



// Here we define the ready event listener to
// log a message that the bot is ready to be used

client.on('ready', (c) => {
    console.log(`${c.user.username} is ready!`)
});



// Here we define the messageCreate event listener to
// check if a message was sent by a user, and 
// to split the message up into words and check if
// any of the words are swear words

client.on('messageCreate', async (message) => {


    if (message.author.bot) return;


    let containsSwearWord = false;
    let msg = message.content.trim().toLowerCase().split(' ');

    for (let m = 0; m < msg.length; m++) {
        msg[m] = msg[m].replaceAll(/[^a-zA-Z\s]/g, '').trim();
    }


    for (let i = 0; i < swearWords.length; i++) {
        for (let j = 0; j < msg.length; j++) {
            if (msg[j] === swearWords[i]) {
                containsSwearWord = true;
            } 
        }
    }


    
// If the message contains a swear word, the bot will
// reply to the user who sent the message
// and delete the original message.

// The bot will also log the action in the database
// as well as any relevant information about the user and the message.
// This includes the user's name, username, id, the time the message was sent,
// and the message itself.

    if (containsSwearWord) {
        try {
            await message.reply(`Don't swear here ${message.author}!`);
            await message.delete();

            await monClient.connect();
            await monClient.db("DiscordBot").collection("Logs").insertOne(
                {
                    name: message.author.displayName.toString(), username: message.author.username.toString(), id: message.author.id.toString(),
                    time: Date(message.createdTimestamp).toString(), message: message.content.toString()
                }
            );

        } catch (e) {
            console.error(e);
        } finally {
            monClient.close();
        }
    }   

});



// Here we define the loginClient function to 
// log in the bot to Discord
function loginClient() {
    client.login(process.env.TOKEN);
}