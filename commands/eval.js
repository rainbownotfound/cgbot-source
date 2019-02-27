const stripIndents = require('common-tags').stripIndents;
const utils = require('../utils');
const config = require('../config.json');

module.exports.run = (client, message, args) => {
    if(message.author.id !== config.devID) {
        message.reply('This command is for Developers only!');
    } else {
        let code = args.join(' ');
        let output;

        try {
            output = eval(code);
        } catch (err) {
            let msg = err;
            if(err && err.response && err.response.body && err.response.body.message) {
                message = err.response.body.message;
            }
            return errorHandler(message, client, code, `${msg}`);
        }

        if(typeof output !== "string") {
            output = require('util').inspect(output);
        }

        output = clean(output).replace(new RegExp(utils.quoteRegex(client.token), 'g'), '');

        message.channel.send({
            embed: utils.embed('', stripIndents`
            **Input:**\n\`\`\`js\n${code}\n\`\`\`
            **Output:**\n\`\`\`js\n${output}\n\`\`\`
            `)
        });
    };
};

function errorHandler(message, client, code, err) {
    message.channel.send({
        embed: utils.embed('', `**Input:**\n\`\`\`js\n${code}\n\`\`\`\n:x: **Error!**\n\`\`\`xl\n${clean(err)}\n\`\`\``, [], {
            color: '#ff0000'
        })
    });
};

function clean(text) {
    return text.replace(/([`@#])/g, '$1\u200b');
};

module.exports.help = {
    command: 'eval'
};