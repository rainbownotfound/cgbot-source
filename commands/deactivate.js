const config = require('../config.json');

module.exports.run = (client, message, args) => {
    if(message.author.id !== config.devID && message.author.id !== config.mother) {
        message.reply('You can\'t use this command!');
    } else {
        message.channel.send('Deactivating now.');

        const timeout1 = setTimeout(function() {
            client.user.setStatus("invisible");
        }, 1000);

        const timeout2 = setTimeout(function() {
            process.exit();
        }, 2000);
    }
};

module.exports.help = {
    command: 'deactivate'
};