const config = require('../config.json');

module.exports.methods = {
    encode: input => {
        return input.toString().split('')
            .map(c => c.charCodeAt(0).toString(2));
    },
    decode: input => {
        let _input = typeof input === 'string' ? input.split(' ') : input;
        return _input.map(c => parseInt(c, 2))
        .map(c => String.fromCharCode(c))
        .join('');
    }
};

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(args.length < 2)
        return message.reply(`Usage: \`!cg binary <encodeText/decodeText> <input>\``);

    let input = args.slice(1).join(' ');

    if(args[0].match(/^enc(ode(Text)?)?$/i)) {
        message.channel.send(this.methods.encode(input).join(' '));
    } else if (args[0].match(/^dec(ode(Text)?)?$/i)) {
        message.channel.send(this.methods.decode(input));
    } else {
        message.channel.send(`Unknown SubCommand: **${args[0]}**`);
    }
}
};

module.exports.help = {
    command: 'binary'
};