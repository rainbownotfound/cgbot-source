const stripIndents = require('common-tags').stripIndents;
const chalk = require('chalk');
const config = require('../config.json');
const utils = require('../utils');

const responses = [
    'Unclear, maybe Charlie knows',
    'Soon',
    'Yes',
    'Absolutely!',
    'Never',
    'Magic 8-Ball is currently unavailable, please leave a message after the tone. \n*BEEP*',
    'When you are ready',
    'Hopefully',
    'Hopefully not',
    'Oh my, why would you even ask that?',
    'What kind of a question is that?',
    'Haha, funny. Joke.'
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(args.length < 1)
        return message.reply(`Please ask something to the Magic 8-Ball.`);

    let response = randomItem(responses);

    const query = args.join(' ');

    if(query.indexOf('What is the Samsung Galaxy Note 7?') > -1 || query.indexOf(`what is the samsung galaxy note 7?`) > -1)  {
        response = `It's also known as a grenade`;
    } else if (query.indexOf(`Can I get an amen?`) > -1 || query.indexOf(`can i get an amen?`) > -1) {
        response = 'Amen';
    } else if (query.indexOf(`Is Waluigi our Lord?`) > -1 || query.indexOf(`is waluigi our lord?`) > -1) {
        response = 'WAHH';
    } else if (query.indexOf(`Who's your daddy?`) > -1 || query.indexOf(`who's your daddy?`) > -1) {
        response = 'JIMMY WALES';
    } else if (query.indexOf(`Is Grill our God?`) > -1 || query.indexOf(`is grill our god?`) > -1) {
        response = 'In the name of the Grill, the Ragu and the Holy Axie. Amen.';
    } else if (query.indexOf(`What is love?`) > -1 || query.indexOf(`what is love?`) > -1) {
        response = 'Baby don\'t hurt me';
    }

    message.channel.send({
        embed: utils.embed(`"${query}"`, stripIndents`
        :8ball: | ${response}
        `)
    });

    console.log(`${chalk.cyanBright(`[8BALL]`)} ${chalk.redBright(`${message.author.username}#${message.author.discriminator}`)} ${chalk.yellowBright(`has asked the 8ball!`)}\n${chalk.greenBright(`${query}`)}`);
}
};

module.exports.help = {
    command: '8ball',
    usage: '!cg 8ball <question>',
    category: 'Fun',
    description: 'Ask the Magic 8-Ball!'
};