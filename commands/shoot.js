const chalk = require('chalk');
const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(args.length < 1)
        return message.reply(`Mention some people to shoot!`);

    let output = message.mentions.users.map(m => `**${m}** :gun:`).join('\n');
    let consoleOutput = message.mentions.users.map(m => `${m.username}`).join(', ');

    message.channel.send({
        embed: utils.embed(`${message.author.username} has a gun!`, output)
    });

    console.log(`${chalk.cyanBright(`[SHOOT]`)} ${chalk.redBright(`${message.author.username}#${message.author.discriminator}`)} ${chalk.yellowBright(`has mentioned some people to shoot!`)}\n${chalk.greenBright(`${consoleOutput}`)}`);
}
};

module.exports.help = {
    command: 'shoot'
};