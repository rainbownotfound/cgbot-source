const sql = require('sqlite');
const utils = require('../utils');
sql.open('./userData.sqlite');

module.exports.run = (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;

    if(!voiceChannel) {
        message.channel.send({
            embed: utils.embed(`CGBot Notification`, `I couldn't find your Voice Channel...`)
        });
    } else {
        sql.get(`SELECT * FROM playing WHERE guildID = "${message.guild.id}"`).then(row => {
            if(row.isReady === "No" || row.isRadioReady === "No") {
                voiceChannel.leave();

                sql.run(`UPDATE playing SET isReady = "Yes", isRadioReady = "Yes" WHERE guildID = "${message.guild.id}"`);

                message.channel.send({
                    embed: utils.embed(`CGBot Notification`, `Successfully Disconnected!`)
                });
            } else {
                message.channel.send({
                    embed: utils.embed(`Error!`, `I'm not playing any music!`, [], {
                        color: "#ff0000"
                    })
                });
            }
        });
    }
};

module.exports.help = {
    command: 'leave'
};