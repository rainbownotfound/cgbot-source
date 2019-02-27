const utils = require('../utils');

module.exports.run = (client, message, args) => {
    message.channel.send({
        embed: utils.embed(`Charlie "CG5" Green`, `Basically CG5, he's a fat dodo egg filled with determination to get through his life and make people happy, and accomplish his "mission". And by mission, I mean his Mormon mission. This dude has worked with so many people and gone so many places, met so many new peoples, man I envy you. But hey, everyone lives they're own life, so hey, go out and build you're own, even if you don't know where to start, you'll figure it out eventually, with the help of friends, that you can make here.\nI know I love this place. Love you Charlie. Yez. :blue_heart:`)
    });
};

module.exports.help = {
    command: 'charlie'
};