const sql = require('sqlite');
const config = require('../config.json');
const utils = require('../utils');
sql.open('../inventory.sqlite');

module.exports.run = (client, message, args) => {
    sql.get(`SELECT * FROM inv WHERE userID = "${message.author.id}"`).then(row => {
        
    })
};

module.exports.help = {
    command: 'inventory'
};