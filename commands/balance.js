const economy = require('discord-eco');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    if(args.length < 1)
    economy.fetchBalance(message.author.id).then((i) => {
        message.channel.send({
            embed: utils.embed(`${message.author.username}'s Balance`, `Balance: ${i.money} CG-Coins`)
        });
    });

    const userThing = message.mentions.users.first().id;

    
        economy.fetchBalance(userThing).then((i) => {
            message.channel.send({
                embed: utils.embed(`${message.mentions.users.first().username}'s Balance`, `Balance: ${i.money} CG-Coins`)
            });
        });
};

module.exports.help = {
    command: 'balance',
    usage: '!cg balance <mentionedUser>',
    category: 'Economy',
    description: 'Check a user\'s balance!'
};