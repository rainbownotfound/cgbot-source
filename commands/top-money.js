const sql = require('sqlite');
const utils = require('../utils');
sql.open('./userData.sqlite');

module.exports.run = (client, message, args) => {
    sql.all(`SELECT * FROM economy ORDER BY money DESC LIMIT 10`).then(rows => {
        var data_content = rows.map(r => `**${client.users.get(r.userID).username}** -> ${r.money} CG-Coins`).join('\n\n');
        message.channel.send({
            embed: utils.embed(`Top Placed Guild Wallets`, data_content)
        });
    });
};

module.exports.help = {
    command: 'top'
};