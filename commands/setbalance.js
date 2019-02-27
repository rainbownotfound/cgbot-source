const economy = require('discord-eco');
const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    if(message.author.id !== config.devID && message.author.id !== config.mother) {
        message.reply(`You can't use this command!`);
    } else {
        const updatedBalance = args.slice(1).join(' ');
        const userThing = message.mentions.users.first().id;

        economy.updateBalance(userThing, updatedBalance);
        message.channel.send(`Successfully updated Balance of ${message.mentions.users.first().username}!`);
    }
};

module.exports.help = {
    command: 'setbal'
};