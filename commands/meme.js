const got = require('got');
const utils = require('../utils');
const config = require('../config.json');
let templates = [];

got('https://memegen.link/templates/').then(res => {
    let data = JSON.parse(res.body);
    templates = [];
    let promises = [];
    for (let key in data) {
        promises.push(_loadMeme(data[key]));
    }

    Promise.all(promises).then(() => {
        templates = templates.filter(e => !!e);
        templates.sort((a, b) => a.name.localeCompare(b.name));
    }).catch(console.error);
}).catch(console.error);

function _loadMeme(url) {
    return got(url).then(res => {
        let singleData = JSON.parse(res.body);

        templates.push({
            name: url.replace(/https\:\/\/memegen\.link\/api\/templates\/(.*)/, '$1'),
            url: url.replace('/api/templates', ''),
            styles: singleData.styles
        });
    });
};

function getMeme(name) {
    return templates.find(m => m.name.toLowerCase() === name.toLowerCase());
};

function cleanInput(input) {
    if(!input) return '';
    return input.replace(/"/g, '\'\'').replace(/\#/g, '~h')
        .replace(/\-/g, '--').replace(/\_/g, '__')
        .replace(' ', '_').replace(/\?/g, '~q')
        .replace(/\%/g, '~p').replace(/\//g, '~s');
}

module.exports.run = async (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if(templates.length < 1)
        return message.reply('The memes haven\'t loaded yet!');

    if(/^(h(elp)?|\?)$/i.test(args[0])) {
        await message.channel.send({
            embed: utils.embed(`Available Memes`, templates.map(meme => `- \`${meme.name}\``).join('\n'))
        });
    }

    if(/^(i(nf(o)?)?)$/i.test(args[0])) {
        if(args.length < 2)
            return message.reply(`You must provide a meme to gather info about!`);

        let info = getMeme(args[1]);
        if(!info)
            return message.channel.send(`That is not a valid meme! Try \`${config.prefix}${this.info.name} help\` to see available memes.`);

        await message.channel.send({
            embed: utils.embed(`\`${info.name}\``, `Styles: ${info.styles && info.styles.length > 1 ? info.styles.map(s => `\n- \`${s}\``).join('') : 'None'}`)
        });
    }

    let input = args.join(' ');
    let parts = input.split('|').map(p => p.trim());

    if(parts.length < 3)
        return message.channel.send(`No message was provided! Usage: \`${config.prefix}meme <name | line 1 | line 2>\``);

    let meme = getMeme(args[0]);
    if(!meme)
        return message.channel.send(`That isn't a valid meme! Try \`${config.prefix}meme help\` to see available memes.`);

    let topText = cleanInput(parts[1]);
    let bottomText = cleanInput(parts[2]);

    if(!topText || !bottomText)
        return message.channel.send('Empty message! Usage: \`!cg meme <name | line 1 | line 2>\`');

    let url = `${meme.url}/${cleanInput(parts[1])}/${cleanInput(parts[2])}.jpg`;
    if(parts[3]) url += `?alt=${encodeURIComponent(parts[3])}`;

    await message.channel.startTyping();
    await message.channel.send({
        files: [
            {
                attachment: url,
                name: `${parts[0]}.jpg`
            }
        ]
    });

    await message.channel.stopTyping();
}
};

module.exports.help = {
    command: 'meme'
};