const webdict = require('webdict');
const chalk = require('chalk');
const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
        if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
        const method = 'dictionary';
        if(args.length < 1) {
            message.reply(`Please provide a word to search.`);
        }

        const parsed = utils.parseArgs(args, ['e']);
        const word = parsed.leftover.join(' ');

        webdict(method, word).then(res => {
            let result;
            if(!res || !res.definition || !res.definition[0]) {
                result = 'No results found.';
            } else {
                result = res.definition[0];
            }

            message.channel.send({
                embed: utils.embed(`:book: ${word}`, result)
            });

            console.log(`${chalk.cyanBright(`[WEBDICT]`)} ${chalk.redBright(`${message.author.username}#${message.author.discriminator}`)} ${chalk.yellowBright(`has searched the dictionary on the word`)} ${chalk.greenBright(`${word}`)}`);
        });
    }
};

module.exports.help = {
    command: 'dict'
};