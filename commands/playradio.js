const sql = require('sqlite');
const yt = require('ytdl-core');
const stripIndents = require('common-tags').stripIndents;
const utils = require('../utils');
sql.open('./userData.sqlite');

module.exports.run = (client, message, args) => {
    function infiniteLooper(dispatcherCB, connection) {
        dispatcherCB.on("end", () => {
            sql.get(`SELECT * FROM songs ORDER BY RANDOM() LIMIT 1`).then(row => {
                sql.get(`SELECT * FROM playing WHERE guildID = "${message.guild.id}"`).then(row2 => {
                    var featuring = row.featuring;
                    let featuringText;
                    if(featuring === "None") {
                        featuringText = "";
                    } else {
                        featuringText = ` feat. **${featuring}**`
                    }

                    if(row2.isRadioReady === "No") {
                        var dispatcher = () => connection.playStream(yt(`${row.link}`));
                        infiniteLooper(dispatcher(), connection);

                        message.channel.send({
                            embed: utils.embed(`Now Playing`, `**${row.name}** by **${row.creator}**${featuringText}`, [], {
                                thumbnail: `${row.cover ? row.cover : ''}`
                            })
                        });
                    }
                })
            });
        });
    }
    const action = args[0];
    const voiceChannel = message.member.voiceChannel;

    sql.get(`SELECT * FROM songs ORDER BY RANDOM() LIMIT 1`).then(row => {
        var featuring = row.featuring;
        let featuringText;
        if(featuring === "None") {
            featuringText = "";
        } else {
            featuringText = ` feat. **${featuring}**`
        }
        if(!action) {
            if(!voiceChannel) {
                message.channel.send({
                    embed: utils.embed(`Error!`, `I could\'nt find your voice channel, please join one and try again!`, [], {
                        color: "#ff0000"
                    })
                });
            } else {
                sql.get(`SELECT * FROM playing WHERE guildID = "${message.guild.id}"`).then(row2 => {
                    if(row2.isRadioReady === "Yes" && row2.isReady === "Yes") {
                        var dispatcher = () => message.guild.voiceConnection.playStream(yt(`${row.link}`));
                        voiceChannel.join()
                            .then(connection => {
                                message.channel.send({
                                    embed: utils.embed(`Now Playing`, `**${row.name}** by **${row.creator}**${featuringText}`, [
                                        {
                                            name: "Requested By",
                                            value: `${message.member.nickname ? message.member.nickname : message.author.username}`
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
                                            value: "Randomizing"
                                        }
                                    ], {
                                        thumbnail: `${row.cover ? row.cover : ''}`,
                                        inline: true
                                    })
                                });
                                infiniteLooper(dispatcher(), connection);

                                sql.run(`UPDATE playing SET isReady = "No", isRadioReady = "No" WHERE guildID = "${message.guild.id}"`);
                            });
                    } else {
                        message.channel.send({
                            embed: utils.embed(`Error!`, `I'm already playing music!`, [], {
                                color: "#ff0000"
                            })
                        });
                    }
                });
            }
        }
    });
};

module.exports.help = {
    command: 'radio'
};