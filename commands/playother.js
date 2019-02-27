module.exports.run = (client, message, args) => {
    client.music.playFunction(message, args);
};

module.exports.help = {
    command: "play"
}