const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const config = require('../config.json');
const utils = require('../utils');

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(args.length < 1) {
        message.reply(`You must provide a equation to be solved on the calculator.`);
    }

    const question = args.join(' ');

    let answer;

    if(question.indexOf(`2 + 2 - 1`) > -1) {
        answer = 'Quick maths';
    } else if (question.indexOf(`1 + 1`) > -1) {
        answer = `Easy! 3!`;
    } else if (question.indexOf(`The loneliest number`) > -1) {
        answer = '1';
    } else if (question.indexOf(`The answer to life, the universe and everything`) > -1) {
        answer = '42';
    } else if (question.indexOf(`Charlie x Gru`) > -1) {
        answer = 'O YES';
    } else {
        try {
            answer = math.eval(question);
        } catch (err) {
            message.channel.send(`Invalid math equation: ${err}`);
        }
    }

    message.channel.send({
        embed: utils.embed(`Calculator`, stripIndents`
        **Equation:**\n\`\`\`\n${question}\n\`\`\`
        **Answer:**\n\`\`\`\n${answer}\n\`\`\`
        `)
    });
}
};

module.exports.help = {
    command: "calc"
};