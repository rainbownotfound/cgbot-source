const config = require('../config.json');

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(args.length < 1)
        return message.reply(`You must provide text to be reversed!`);

    message.channel.send(args.join(' ').split('').reverse().join(''));
    }
};

module.exports.help = {
    command: 'reverse'
};