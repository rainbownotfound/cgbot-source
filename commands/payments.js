const economy = require(`discord-eco`);
const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    const payment = args.slice(1).join(' ');
    const userThing = message.mentions.users.first().id;

    if(userThing === message.author.id) {
        message.reply(`You don't need to pay yourself, silly!`);
    } else {
    economy.fetchBalance(message.author.id).then((i) => {
        if(payment > i.money) {
            message.reply(`You don't have enough money to pay that amount!`);
        } else {
            economy.updateBalance(message.author.id, -payment);
            economy.updateBalance(userThing, payment);

            message.channel.send(`You successfully gave ${message.mentions.users.first().username} ${payment} CG-Coins.`);
        }
    });
    }
};

module.exports.help = {
    command: 'pay'
};