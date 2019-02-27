const sql = require('sqlite');
const yt = require('ytdl-core');
const config = require('../config.json');
const utils = require('../utils');
sql.open('./music.sqlite');

module.exports.run = (client, message, args) => {
    if(message.author.id !== config.devID) {
        message.reply(`You can't use this command!`);
    } else {
    const action = args[0];
    const voiceChannel = message.member.voiceChannel;
    
    if (action === "list") {
        sql.all(`SELECT * FROM songs ORDER BY name ASC`).then(rows => {
            var data_content = rows.map(r => `${r.name}`).join('\n');

            message.channel.send({
                embed: utils.embed(`All Available Songs`, `Please note that every song needs to be written EXACTLY the same as the ones shown here.\n\n${data_content}`)
            });
        }).catch(() => {
            console.error;
            message.channel.send({
                embed: utils.embed(`Error!`, `Database is empty!`)
            })
        });
    } else if (!action) {
        message.channel.send({
            embed: utils.embed(`Error!`, `Please try \`!cg play list\` for a list of all available songs!`, [], {
                color: "#ff0000"
            })
        });
    } else {
    if(message.channel.id !== config.musicChannel && message.channel.id !== config.testingChannel) {
        message.reply(`You need to be in <#${config.musicChannel}> to use this command!`)
    } else {
    sql.get(`SELECT * FROM songs WHERE name = "${args[0]}"`).then(row => {
        if(!row) {
            message.channel.send({
                embed: utils.embed(`Error!`, `Could not find song **${args[0]}**!`, [], {
                    color: "#ff0000"
                })
            });
        } else {
            sql.get(`SELECT * FROM playing WHERE guildID = "${message.guild.id}"`).then(row2 => {
                if(row2.isReady === "No") {
                    voiceChannel.join().then(connection => {
                        const dispatcher = connection.playStream(yt(`${row.link}`));
        
                        message.channel.send({
                            embed: utils.embed(`Now Playing`, `**${row.name}**\n\nRequested by ${message.author.username}\nIn text channel <#${message.channel.id}>\nPlaying in voice channel ${voiceChannel.name}`)
                        });
        
                        dispatcher.on("end", end => {
                            isReady = true;
                        });
                    });
                } else {
                    message.channel.send({
                        embed: utils.embed(`Error!`, `I'm not playing music!`, [], {
                            color: "#ff0000"
                        })
                    });
                }
            })
        }
    }).catch(() => {
        console.error;
        message.channel.send({
            embed: utils.embed(`Error!`, `Database is empty!`)
        })
    });
}
}
    }
};

module.exports.help = {
    command: 'devplay'
};