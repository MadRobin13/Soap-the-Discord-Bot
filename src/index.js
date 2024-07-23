const dotenv = require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');

// List of swear words that should be filtered out of the chat



let swearWords = [];
let dataLoaded = false;

fs.readFile('src/words.txt', 'utf8', async (err, data) => {
    if (err) {
        console.error('error reading file', err);
        return;
    }
    swearWords = data.split('\r\n');
    extractWords(data);
    loginClient();
    // console.log(swearWords); 
})

// for (let i = 0; i < swearWords.length; i++) {
//     swearWords[i].replace(/\r/g, '');   
// }
// console.log(swearWords);

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
    let msg = message.content.toLowerCase().split(' ');
    for (let i = 0; i < swearWords.length; i++) {
        for (let j = 0; j < msg.length; j++) {
            if (msg[j] === swearWords[i]) {
                try {
                    await message.reply(` Don't swear here ${message.author}!`);
                    await message.delete();
                } catch (e) {
                    console.error('error deleting message', e);
                }
                break;
            } 
        }
    }
});

function loginClient() {
    client.login(process.env.TOKEN);
}

function extractWords(data) {  
    this.swearWords = data.split('\n');

    for(let i =0; i < swearWords.length; i++) {
        swearWords[i].replace(/\r/g, ''); 
    }
}