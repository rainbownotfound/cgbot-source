const stripIndents = require('common-tags').stripIndents;
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    message.channel.send({
        embed: utils.embed(`Developer Commands`, stripIndents`
        deactivate -> Turn off the bot
        eval -> Evaluate a piece of JavaScript code
        setbal -> Set a user's balance in the economy module
        status -> Sets the bot's status
        tweet -> Tweet to the CGBot Twitter account
        `)
    });
};

module.exports.help = {
    command: 'devcommands'
};