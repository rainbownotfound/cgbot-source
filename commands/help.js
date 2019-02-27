const stripIndents = require('common-tags').stripIndents;
const utils = require('../utils');
const config = require('../config.json');

module.exports.run = (client, message, args) => {
    message.channel.send({
        embed: utils.embed('Welcome to CGBot!', stripIndents`
        Hey there! I am CGBot, a bot made for Charlie, and coded by RainbowNotFound#3173! Send \`!cg commands\` for a list of my commands!

        Make sure to follow me on [Twitter](https://twitter.com/CGBot_Discord)!
        `)
    });
};

module.exports.help = {
    command: 'help'
};