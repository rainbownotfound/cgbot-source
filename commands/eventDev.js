const sql = require('sqlite');
const config = require('../config.json');
const utils = require('../utils');
sql.open("./userData.sqlite");

module.exports.run = (client, message, args) => {
    if(message.author.id !== config.devID) {
        message.channel.send({
            embed: utils.embed(`Error!`, `You require the permission \`BOT_DEVELOPER\` to execute this command!`, [], {
                color: "#ff0000"
            })
        });
    } else {
        let input = args.join(' ');
        let parts = input.split(' | ').map(p => p.trim());

        sql.get(`SELECT * FROM song_event WHERE song = "${parts[0]}"`).then(row => {
            if(!row) {
                sql.run(`INSERT INTO song_event (song, reward) VALUES (?, ?)`, [parts[0], parts[1]]);

                message.channel.send(`Successfully added **${parts[0]}** for **${parts[1]} CG$**!`);
            } else {
                message.channel.send({
                    embed: utils.embed(`Error!`, `This song is already registered!`, [], {
                        color: "#ff0000"
                    })
                });
            }
        })
    }
};

module.exports.help = {
    command: 'event'
};