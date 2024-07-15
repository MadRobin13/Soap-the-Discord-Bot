require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');

// List of swear words that should be filtered out of the chat
const swearWords = [
    // Common swear words
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
        client.on('messageCreate', (message) => {
            if (message.author.bot) return;
            for (let i = 0; i < swearWords.length; i++) {
                if (message.content.toLowerCase().includes(swearWords[i])) {
                    message.delete();
                    message.reply(`Please do not swear in this server ${message.author}!`); 
                    return;
                }
            }
        })

        client.login(process.env.TOKEN);


