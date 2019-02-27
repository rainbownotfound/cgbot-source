const dateFormat = require('dateformat');
const chalk = require('chalk');
const config = require('../config.json');
const utils = require('../utils');

dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(message.mentions.users.size < 1)
        return message.reply('Please mention someone to gather info on!');

    let user = message.mentions.users.first();
    let member = message.guild.member(user);

    if(!member)
        return message.reply('That member could not be found!');
    
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = millisCreated / 1000 / 60 / 60 / 24;

    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if(roles.length < 1) roles = ['None'];

    message.channel.send({embed: {
        color: 0x80FF00,
        title: `User Info | ${user.username}#${message.mentions.users.first().discriminator}`,
        fields: [{
            name: 'Status',
            value: `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`,
        },
        {
            name: 'Game',
            value: `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'}`,
        },
        {
            name: 'Created On',
            value: `${dateFormat(user.createdAt)}`,
        },
        {
            name: 'Days Since Creation',
            value: `${daysCreated.toFixed(0)}`,
        },
        {
            name: 'Joined On',
            value: `${dateFormat(member.joinedAt)}`,
        },
        {
            name: 'Days Since Joining',
            value: `${daysJoined.toFixed(0)}`,
        },
        {
            name: 'Roles',
            value: `${roles.join(', ')}`,
            inline: false,
        },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: `User ID: ${user.id}`
        }
      }
    });
}
};

module.exports.help = {
    name: 'User Info',
    command: 'userinfo'
}