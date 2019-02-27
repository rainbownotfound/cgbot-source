const chalk = require('chalk');
const config = require('../config.json');

module.exports.run = (client, message, args) => {
    const sayMessage = args.join(' ');

    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.reply(`You need to be in <#${config.lockToChannel}> to do that!`);
    } else {
    if(!sayMessage) {
        message.reply(`Please specify a message to say!`);
    } else {
        message.delete()
        message.channel.send(sayMessage);

        console.log(`${chalk.cyanBright(`[Say]`)} ${chalk.redBright(`${message.author.username}#${message.author.discriminator}`)} ${chalk.yellowBright(`made me say something!`)}\n${chalk.greenBright(sayMessage)}`);
    }
}
};

module.exports.help = {
    command: 'say'
};