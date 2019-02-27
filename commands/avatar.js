const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
        if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('Please mention the user who you want the avatar from.');

    if(!user.avatarURL)
        return message.channel.send(`That user does not have an avatar`);

    message.channel.send({
        embed: utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
    });
}
};

module.exports.help = {
    command: 'avatar',
    usage: '!cg avatar <mentionedUser>',
    category: 'Utility',
    description: 'GEt the avatar of a certain user!'
};