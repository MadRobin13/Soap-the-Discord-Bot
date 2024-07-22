const dotenv = require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');


// List of swear words that should be filtered out of the chat
const swearWords = [
    // Swear words
    "ass",
    "bastard",
    "bitch",
    "bollocks",
    "crap",
    "cunt",
    "damn",
    "dick",
    "douche",
    "fag",
    "faggot",
    "fuck",
    "goddamn",
    "hell",
    "idiot",
    "jerk",
    "motherfucker",
    "nigga",
    "nigger",
    "piss",
    "prick",
    "pussy",
    "shit",
    "slut",
    "tit",
    "twat",
    "wanker",
    "retard",
    "whore",
    "slut",
    "spic",
    "chink",
    "kike",
    "gook",
    "wetback",
    "tranny",
    "trannies",
  
    // Variations with symbols
    "a$$",
    "@ss",
    "b!tch",
    "b!7ch",
    "b17ch",
    "b!+ch",
    "b!t+h",
    "b1tch",
    "b1+ch",
    "b*tch",
    "b!+ch",
    "b!tch",
    "c*nt",
    "c**t",
    "c*nt",
    "d*mn",
    "d*ck",
    "d1ck",
    "d!ck",
    "f*ck",
    "f**k",
    "f*ck",
    "f*ck",
    "f**k",
    "f*ck",
    "f@ggot",
    "f@g",
    "f@g",
    "f@ggot",
    "f@g",
    "f@ggot",
    "g*ddamn",
    "h3ll",
    "sh!t",
    "sh1t",
    "sh!t",
    "sh*t",
    "t1t",
    "t!t",
    "tw@t",
    "w@nk",
    "w@nker",
    "r3tard",
    "r*tard",
    "wh*re",
    "wh0re",
    "sl*t",
    "sp*c",
    "ch!nk",
    "k!ke",
    "g**k",
    "w3tback",
    "tr*anny",
    "tr@nnies"
];


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

client.login(process.env.TOKEN);