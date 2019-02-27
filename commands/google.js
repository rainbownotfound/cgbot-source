const got = require('got');
const cheerio = require('cheerio');
const chalk = require('chalk');
const config = require('../config.json');
const utils = require('../utils');

const QUERY_STRING_SETTINGS = [
    'client=chrome',
    'rls=en',
    'ie=UTF-8',
    'oe=UTF-8'
].join('&');

function getText(children) {
    if (children.children) return getText(children.children);
    return children.map(c => {
        return c.children ? getText(c.children) : c.data;
    }).join('');
}

module.exports.run = async (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.channel.send(`You need to be in <#${config.lockToChannel}> in order to use this command!`);
    } else {
    if (args.length < 1) {
        message.reply('You must enter something to search for!');
    }

    await message.channel.startTyping();

    const res = await got(`https://google.com/search?${QUERY_STRING_SETTINGS}&q=${encodeURIComponent(args.join(' '))}`);
    if (res.statusCode !== 200) {
        return message.channel.send(`:no_entry_sign: Error! (${res.statusCode}): ${res.statusMessage}`);

        message.channel.stopTyping();
    }

    let $ = cheerio.load(res.body);
    let results = [];

    $('.g').each((i) => {
        results[i] = {};
    });

    $('.g>.r>a').each((i, e) => {
        let raw = e.attribs['href'];
        results[i]['link'] = decodeURIComponent(raw.substr(7, raw.indexOf('&sa=U') - 7));
    });

    $('.g>.s>.st').each((i, e) => {
        results[i]['description'] = getText(e);
    });

    let output = results.filter(r => r.link && r.description)
        .slice(0, 5)
        .map(r => `${r.link}\n${r.description}\n`)
        .join('\n');

    message.channel.send({
        embed: utils.embed(`Search results for \`"${args.join(' ')}"\``, output)
    });

    await message.channel.stopTyping();

    await console.log(`${chalk.cyanBright(`[GOOGLE]`)} ${chalk.redBright(`${message.author.username}#${message.author.discriminator}`)} ${chalk.yellowBright(`Googled on`)} ${chalk.greenBright(`${args.join(' ')}`)}`);
}
};

module.exports.help = {
    command: 'google'
};
