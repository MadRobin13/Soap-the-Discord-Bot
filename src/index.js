const dotenv = require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');


let swearWords = [];

fs.readFile('src/words.txt', 'utf8', async (err, data) => {
    if (err) {
        console.error('error reading file', err);
        return;
    }
   
    swearWords = data.split('\r\n');
    loginClient();
});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent 
    ]});

client.on('ready', (c) => {
    console.log(`${c.user.username} is ready!`)
});


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


    if (containsSwearWord) {
        try {
            await message.reply(`Don't swear here ${message.author}!`);
            await message.delete();
        } catch (e) {
            console.error('error deleting message', e);
        }
    }   
});



function loginClient() {
    client.login(process.env.TOKEN);
}