const yt = require('ytdl-core');
const config = require('../config.json');

module.exports.run = (client, message, args) => {
    const memeName = args.join(' ');
    const voiceChannel = message.member.voiceChannel;

    if(message.author.id !== config.devID && message.author.id !== config.mother && message.author.id !== config.admins.ragu) {
        message.reply(`Oh wow, looks like you're not permitted in the DM! (Deported Memes)`);
    } else {
        if(memeName === "Noice") {
            message.delete();

            voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(yt(`https://www.youtube.com/watch?v=VPVQlWa8-gA`));

                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            });
        } else if(memeName === "No More Pizza") {
            message.delete();

            voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(yt(`https://www.youtube.com/watch?v=iYkOBa1cMTg`));

                dispatcher.on("end", end => {
                    voiceChannel.leave();
                });
            });
        }
    }
};

module.exports.help = {
    command: 'playmeme'
};