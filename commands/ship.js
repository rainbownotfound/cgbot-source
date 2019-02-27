const config = require(`../config.json`);
const utils = require('../utils');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.reply(`You have to be in <#${config.lockToChannel}> to use me!`);
    } else {
        const firstShip = args[0];
        const secondShip = args[1];
        
        const shipPercent = getRandomInt(0, 100);

        if(args.length < 0)
            return message.reply(`You have to say at least 2 names!`);

        if(!secondShip)
            return message.reply(`Please specify 2 names instead of 1.`);

        let score;
        if(shipPercent < 10) {
            score = "Forget it.";
        } else if (shipPercent > 10 && shipPercent < 20) {
            score = "Small chance.";
        } else if (shipPercent > 20 && shipPercent < 30) {
            score = "Mehh";
        } else if (shipPercent > 30 && shipPercent < 40) {
            score = "Not even halfway there";
        } else if (shipPercent > 40 && shipPercent < 50) {
            score = "Almost halfway through.";
        } else if (shipPercent > 50 && shipPercent < 60) {
            score = "Well, you're somewhere.";
        } else if (shipPercent > 60 && shipPercent < 70) {
            score = "Oh, that's good, I think";
        } else if (shipPercent > 70 && shipPercent < 80) {
            score = "Just like Charlie x Gru?";
        } else if (shipPercent > 80 && shipPErcent < 90) {
            score = "Dang. You like each other more than I thought";
        } else if (shipPercent > 90 && shipPercent < 100) {
            score = "It's... worth it, I guess";
        } else if (shipPercent = 100) {
            score = "YOU FOUND YOUR HUSBAND/WIFE! I'M PROUD OF YA";
        }

        message.channel.send({
            embed: utils.embed(`Shipping`, `${firstShip} x ${secondShip}\n${shipPercent}% --> ${score}`)
        });
    }
};

module.exports.help = {
    command: 'ship'
};