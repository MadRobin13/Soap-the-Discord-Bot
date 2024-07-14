//WATCH THIS VIDEO FIRST TO SET UP YOUR BOT IN THE DISCORD DEVELOPER PORTAL: https://www.youtube.com/watch?v=KZ3tIGHU314

//To begin you'll want to setup your project by running npm init -y in the terminal to create a package.json file OUTSIDE THE SRC FOLDER.
//Then, you'll want to install the discord.js module by running npm install discord.js in the terminal.
//Finally, you'll want to create a key.txt file in the src folder and put your bot token in it (you can get this from the discord developer portal).






//############################################################################################################################################################################
//############################################################################################################################################################################
//############################################################################################################################################################################






//Requiring the discord.js module and the fs module (run npm install discord.js fs to install the discord module)
const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');

//Creating the client (bot) with the intents of guilds, guild members, guild messages, and message content
// (these are it's permissions and are related to the ones you gave it in the discord developer portal)
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]});

//Reading the key from the key.txt file toi log in the bot using my generated token (you can get yours from 
//the developer portal and put it in a key.txt file in the same directory as this file)
fs.readFile('src/key.txt', (err, data) => {
//Catching and throwing any file reading errors
    if (err) {
        throw(err);
    }
    else {
//(The data parameter is the key but it needs to be converted to a string)
//(You can also use the token as a string instead of reading it from a file)
        const key = data.toString();

//If the bot is ready then it will send this message to the console (you can add any other event parameters 
//here for other events)
        client.on('ready', (c) => {
            console.log(`${c.user.username} is online!`)
        });

//Actually logging in the bot
        client.login(key);
        }
});

