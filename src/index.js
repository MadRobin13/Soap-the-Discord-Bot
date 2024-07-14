const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]});

fs.readFile('src/key.txt', (err, data) => {
    if (err) {
        throw(err);
    }
    else {
        const key = data.toString();
        client.login(key);
        console.log("logged in!")
        }
});

// const reader = new FileReader();
// reader.readAsText('./key.txt', 'uft-8');
// const key = reader.result.toString();

