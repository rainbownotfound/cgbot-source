const sql = require('sqlite');
const yt = require('ytdl-core');
const config = require('../config.json');
const utils = require('../utils');
sql.open('./userData.sqlite');

module.exports.run = (client, message, args) => {
    function putOnLoop(dispatcherCB, connection) {
        dispatcherCB.on("end", () => {
            sql.get(`SELECT * FROM songs WHERE name="${parts_2[0]}"`).then(row => {
                var dispatcher = () => connection.playStream(yt(`${row.link}`));
                putOnLoop(dispatcher(), connection);
            });
        });
    }

    const action = args[0];
    let input = args.slice(1).join(' ');
    let parts = input.split('|').map(p => p.trim());
    const songLink = parts[4];
    const voiceChannel = message.member.voiceChannel;

    let input_2 = args.join(' ');
    let parts_2 = input_2.split(' l').map(p => p.trim());
    
    if(action === "add") {
        if(message.author.id !== config.devID) {
            message.channel.send({
                embed: utils.embed(`Error!`, `This argument is for developers only!`, [], {
                    color: "#ff0000"
                })
            });
        } else {
            sql.get(`SELECT * FROM songs WHERE name = "${args[1]}"`).then(row => {
                if(!row) {
                    sql.run(`INSERT INTO songs (name, link, creator, featuring, cover) VALUES (?, ?, ?, ?, ?)`, [parts[0], songLink, parts[1], parts[2], parts[3]]);

                    message.channel.send(`Song **${parts[0]}** has been added successfully!`);
                } else {
                    message.reply(`This song is already added!`);
                }
            }).catch(() => {
                console.error;
                sql.run(`CREATE TABLE IF NOT EXISTS songs (name TEXT, link TEXT, creator TEXT, featuring TEXT, cover TEXT)`).then(() => {
                    sql.run(`INSERT INTO songs (name, link, creator, featuring, cover) VALUES (?, ?, ?, ?, ?)`, [parts[0], songLink, parts[1], parts[2], parts[3]]);

                    message.channel.send(`Song **${parts[0]}** has been added successfully!`);
                });
            });
        }
    } else if (action === "list") {
        sql.all(`SELECT * FROM songs ORDER BY name ASC`).then(rows => {
            var data_content = rows.map(r => `${r.name}`).join('\n');

        sql.all(`SELECT * FROM songs ORDER BY RANDOM() LIMIT 1`).then(row2 => {
            message.channel.send({
                embed: utils.embed(`All Available Songs`, `Please note that every song needs to be written EXACTLY the same as the ones shown here.\n\n${data_content}`)
            });
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
    } else if (action === "delete") {
        if(message.author.id !== config.devID) {
            message.channel.send({
                embed: utils.embed(`Error!`, `This argument is for developers only!`, [], {
                    color: "#ff0000"
                })
            });
        } else {
            sql.get(`SELECT * FROM songs WHERE name = "${parts[0]}"`).then(row => {
                if(!row) {
                    message.reply(`That song isn't added or already deleted!`);
                } else {
                    sql.run(`DELETE FROM songs WHERE name = "${parts[0]}"`);
                    message.channel.send(`Song **${parts[0]}** successfully deleted.`);
                }
            })
        }
    } else {
    if(message.channel.id !== config.musicChannel && message.channel.id !== config.testingChannel) {
        message.reply(`You need to be in <#${config.musicChannel}> to use this command!`)
    } else {
    sql.get(`SELECT * FROM songs WHERE name = "${parts_2[0]}"`).then(row => {
        var featuring = row.featuring;
        let featuringText;
        if(featuring === "None") {
            featuringText = "";
        } else {
            featuringText = ` feat. **${featuring}**`
        }

        if(!row) {
            message.channel.send({
                embed: utils.embed(`Error!`, `Could not find song **${parts_2[0]}**!`, [], {
                    color: "#ff0000"
                })
            });
        } else {
            sql.get(`SELECT * FROM playing WHERE guildID = "${message.guild.id}"`).then(row2 => {
                if(row2.isReady === "Yes") {
                    const needLoopYes = parts_2[1];
                    if(!needLoopYes) {
                        sql.run(`UPDATE playing SET isReady = "No" WHERE guildID = "${message.guild.id}"`);
                        voiceChannel.join().then(connection => {
                            const dispatcher = connection.playStream(yt(`${row.link}`));

                            message.channel.send({
                                embed: utils.embed(`Now Playing`, `**${row.name}** by **${row.creator}**${featuringText}`, [
                                    {
                                        name: "Requested By",
                                        value: message.author.username
                                    },
                                    {
                                        name: "Text Channel",
                                        value: `<#${message.channel.id}>`
                                    },
                                    {
                                        name: "Voice Channel",
                                        value: voiceChannel.name
                                    },
                                    {
                                        name: 'Looping?',
                                        value: "No"
                                    }
                                ], {
                                    thumbnail: `${row.cover ? row.cover : ''}`,
                                    inline: true
                                })
                            });
                            
                            dispatcher.on("end", end => {
                                sql.run(`UPDATE playing SET isReady = "Yes" WHERE guildID = "${message.guild.id}"`)
                            });
                        });
                    } else if(needLoopYes === "oop") {
                        var dispatcher = () => message.guild.voiceConnection.playStream(yt(`${row.link}`));
                        voiceChannel.join()
                            .then(connection => {
                                message.channel.send({
                                    embed: utils.embed(`Now Playing`, `**${row.name}** by **${row.creator}**${featuringText}`, [
                                        {
                                            name: "Requested By",
                                            value: message.author.username
                                        },
                                        {
                                            name: "Text Channel",
                                            value: `<#${message.channel.id}>`
                                        },
                                        {
                                            name: "Voice Channel",
                                            value: voiceChannel.name
                                        },
                                        {
                                            name: 'Looping?',
                                            value: "Yes"
                                        }
                                    ], {
                                        thumbnail: `${row.cover ? row.cover : ''}`,
                                        inline: true
                                    })
                                });
                                putOnLoop(dispatcher(), connection);
                                sql.run(`UPDATE playing SET isReady = "No" WHERE guildID = "${message.guild.id}"`);
                            });
                    }
                } else {
                    message.channel.send({
                        embed: utils.embed(`Error!`, `I'm already playing music!`, [], {
                            color: "#ff0000"
                        })
                    });
                }
            }).catch(() => {
                sql.run(`CREATE TABLE IF NOT EXISTS playing (guildID TEXT, isReady TEXT, isRadioReady TEXT)`).then(() => {
                    sql.run(`INSERT INTO playing (guildID, isReady, isRadioReady) VALUES (?, ?, ?)`, [message.guild.id, "Yes", "Yes"]);

                    message.channel.send({
                        embed: utils.embed(`CGBot Notification`, `I have added the server to my music database, please try to use the command again.`, [], {
                            color: "#00FFFF"
                        })
                    });
                });
            });
        }
    }).catch(() => {
        console.error;
        message.channel.send({
            embed: utils.embed(`Error!`, `Database is empty!`)
        })
    });
}
}
};

module.exports.help = {
    command: 'play'
};