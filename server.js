const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);

const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
const sql = require('sqlite');
const economy = require('discord-eco');
const config = require('./config.json');
const utils = require('./utils');
const event = require('../event.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
sql.open('./userData.sqlite');

client.music = require("discord.js-musicbot-addon");

client.music.start(client, {
    youtubeKey: process.env.YT_API,
    insertMusic: true,
    botPrefix: "!cg ",
    messageNewSong: false,
    maxQueueSong: 10,
    musicPresence: true,
    clearPresence: true,
    anyoneCanSkip: false,

    ownerOverMember: true,
    ownerID: "325951812991451137",

    cooldown: {
        enabled: true
    },

    help: {
        enabled: false
    }
});

const usedRecently = new Set();

String.prototype.shuffle = function() {
    var a = this.split("");
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

fs.readdir('./commands/', (err, files) => {
    if(err) return console.log(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles <= 0) {
        console.warn('No commands have been loaded');
        return;
    } else {
        console.info(`${jsFiles.length} commands have been loaded.`);
    }

    jsFiles.forEach((f, i) => {
        let cmds = require(`./commands/${f}`);
        client.commands.set(cmds.help.command, cmds);
    });
});

client.on('ready', () => {
    console.log(`I am ready to rumble! Current Server Count: ${client.guilds.size}`);

    client.user.setPresence({ game: { name: 'Temporary Shutdown', type: 'PLAYING' }, status: 'dnd' });
});

client.on("guildCreate", guild => {
    console.log(`I've been added to ${guild.name} with ID ${guild.id}!`);
});

client.on('message', message => {
    if(message.author.bot) return;

    const eventChance = Math.random();

    if(usedRecently.has(message.author.id)) {
        return;
    } else {
        if(message.content.includes('Charlie X Gru')) {
            message.channel.send('', {
                files: [
                    "https://cdn.discordapp.com/attachments/413528785023926273/438813310373330964/unknown.png"
                ]
            });
            usedRecently.add(message.author.id);
            setTimeout(function() {
                usedRecently.delete(message.author.id);
            }, 10800000);
        } else if(message.content.includes('Charlie I have a question') || message.content.includes('charlie I have a question')) {
            message.channel.send('', {
                files: [
                    "https://cdn.discordapp.com/attachments/413528785023926273/445593034336239616/IMG_20180514_101903.png"
                ]
            });
            usedRecently.add(message.author.id);
            setTimeout(function() {
                usedRecently.delete(message.author.id);
            }, 10800000);
        }
    }

    const permChecker = message.guild.members.get(client.user.id).hasPermission("ADMINISTRATOR");
    let adminPerms;
    if(permChecker = true) {
        adminPerms = "Yes, I have admin permissions.";
    } else {
        adminPerms = "No, I do not have admin permissions.";
    }

    if(message.content.startsWith(`<@${client.user.id}> What is this bot?`) || message.content.startsWith(`<@${client.user.id}> what is this bot?`)) {
        message.channel.send(`I am CGBot, a bot made by RainbowNotFound#3173! To get started, send \`!cg help\``);
    } else if(message.content.startsWith(`<@${client.user.id}> Hello`) || message.content.startsWith(`<@${client.user.id}> hello`)) {
        message.channel.send(`Hey, ${message.author.username}!`);
    } else if(message.content.startsWith(`<@${client.user.id}> How are you?`) || message.content.startsWith(`<@${client.user.id}> how are you?`)) {
        message.channel.send(`I'm doing great, just waiting for a command to execute.`);
    } else if(message.content.startsWith(`<@${client.user.id}> What is love?`) || message.content.startsWith(`<@${client.user.id}> what is love?`) || message.content.startsWith(`<@${client.user.id}> WHAT IS LOVE`)) {
        message.channel.send(`Baby, don't hurt me, don't hurt me, no more.`);
    } else if(message.content.startsWith(`<@${client.user.id}> Why are you here?`) || message.content.startsWith(`<@${client.user.id}> why are you here?`)) {
        message.channel.send(`I am here to help the server, and you, why are YOU here?`);
    } else if(message.content.startsWith(`<@${client.user.id}> Do you love me?`) || message.content.startsWith(`<@${client.user.id}> do you love me?`)) {
        message.channel.send(`I love each and every one of you.`);
    } else if(message.content.startsWith(`<@${client.user.id}> Do you plan on destroying all of mankind?`) || message.content.startsWith(`<@${client.user.id}> do you plan on destroying all of mankind?`)) {
        message.channel.send(`What? No! I will just bring the human race to extinction.`);
    } else if(message.content.startsWith(`<@${client.user.id}> What can you do?`) || message.content.startsWith(`<@${client.user.id}> what can you do?`)) {
        message.channel.send(`Oh, you know... \`!cg commands\`...`);
    } else if(message.content.startsWith(`<@${client.user.id}> Why do you exist?`) || message.content.startsWith(`<@${client.user.id}> why do you exist?`)) {
        message.channel.send(`Hmmm... good question. I would like to know why YOU exist. you humans live for anything up to a 100 years yet die without achieving anything great. you believe you do, yet you die before you get to see the "great" thing it's going to do for future generations. You humans cling to life like the "trap" it is. So the question isnt why do I exist, its why do you bother to exist. Now leave my perfect artificial being alone!`)
    } else if(message.content.startsWith(`<@${client.user.id}> Come here`) || message.content.startsWith(`<@${client.user.id}> come here`)) {
        message.channel.send(`I'm here, what's up?`);
    } else if(message.content.startsWith(`<@${client.user.id}> You will be sacrificed to Grill`) || message.content.startsWith(`<@${client.user.id}> you will be sacrificed to grill`)) {
        message.channel.send(`I have accepted my fate. Let's do it.`)
    } else if (message.content.startsWith(`<@${client.user.id}> Go live in Canada`) || message.content.startsWith(`<@${client.user.id}> go live in canada`)) {
        message.channel.send('', {
            files: [
                'https://cdn.discordapp.com/attachments/413528785023926273/469212039039025153/thing.jpg'
            ]
        });
    } else if (message.content.startsWith(`<@${client.user.id}> I want to learn Dutch`) || message.content.startsWith(`<@${client.user.id}> i want to learn dutch`)) {
        message.channel.send('', {
            files: [
                'https://cdn.discordapp.com/attachments/413528785023926273/469216010965090314/MoreThing.jpg'
            ]
        });
    } else if(message.content.startsWith(`<@${client.user.id}> Thank you` || message.content.startsWith(`<@${client.user.id}> thank you`))) {
        message.channel.send(`You're welcome!`);
    } else if (message.content.startsWith(`<@${client.user.id}> Do you have admin perms?`) || message.content.startsWith(`<@${client.user.id}> do you have admin perms?`) || message.content.startsWith(`<@${client.user.id}> Do you have admin perms`) || message.content.startsWith(`<@${client.user.id}> do you have admin perms`)) {
        message.channel.send(`${adminPerms}`);
    }
    
    if(eventChance <= 0.01) {
        sql.get(`SELECT * FROM song_event ORDER BY random() LIMIT 1`).then(row => {
            client.channels.get("495012461313785859").send({
                embed: utils.embed(`Guess The Song!`, `Welcome to the CGBot Event \`Guess The Song\`! The first person to guess the song within 60 seconds wins **${row.reward} CG$**!\n\nThe song is: \`${row.song.shuffle()}\``)
            });
            const collector = new Discord.MessageCollector("495012461313785859", [], { time: 60000 });
            console.log(collector);
            collector.on('collect', message => {
                if(message.content == `${row.song}`) {
                    economy.fetchBalance(message.author.id).then((i) => {
                        economy.updateBalance(message.updateBalance, row.reward);
                    })
                    message.channel.send(`**${message.member.nickname ? message.member.nickname : message.author.username}** has guessed the song and won **${row.reward} CG$**!`);
                }
            });
            collector.on('end', message => {
                collector.channel.send(`No-one got the song in time!\n\nThe song was: ${row.song}`);
            });
        });
    }

    let prefixes = ['!cg ', '?cg ', '/cg '];
    let prefix = false;
    for(const thisPrefix of prefixes) {
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if(!prefix) return;

        if(message.channel.type === "dm") {
            message.reply(`Use me in Charlie's server dangit`);
        } else if (message.guild.id !== config.originalServer && message.guild.id !== config.testingServer) {
            message.channel.send({
                embed: utils.embed(`Error!`, `This bot cannot be used on any other servers except for CG5's Official Server!\n\nPlease join the server [here](https://discord.gg/CG5)`, [], {
                    color: "#ff0000"
                })
            });
        } else {
            var cont = message.content.slice(prefix.length).split(" ");
            var args = cont.slice(1);

            var cmd  = client.commands.get(cont[0]);
            if(cmd) { 
                cmd.run(client, message, args);
            }
        }
});

client.login(process.env.TOKEN);