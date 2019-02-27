const utils = require('../utils');

module.exports.run = (client, message, args) => {
    let commandz = client.commands.map(c => `[${c.help.command}]`).join('(Description Unavailable)\n');

    message.channel.send({
        embed: utils.embed(`All Commands`, `Total Command Count: ${client.commands.size + 11}\n\`\`\`markdown\n${commandz}\n\`\`\`\n\nMusic Addon:\n\`\`\`\nplay\nsearch\nskip\nqueue\npause\nresume\nremove\nvolume\nleave\nclearqueue\nnp\n\`\`\``)
    });
};

module.exports.help = {
    command: 'commands'
};