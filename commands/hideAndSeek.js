const economy = require('discord-eco');
const stripIndents = require('common-tags').stripIndents;
const config = require('../config.json');
const utils = require('../utils');

const usedRecently = new Set();

const areas = () => {
    return utils.randomSelection([
        "HypeSquad Facility",
        "Nitro Factory",
        "User Database",
        "Bot Operation Rooms",
        "Game Lookout",
        "Partners Lounge",
        "Wumpus Habitat",
        "Elite Samurai Training Grounds"
    ]);
};

module.exports.run = (client, message, args) => {
    if(message.channel.id !== config.lockToChannel && message.channel.id !== config.testingChannel) {
        message.reply(`You have to be in <#${config.lockToChannel}> to use that!`);
    } else {
        if(args.length < 1)
            return message.reply(`You have to specify a area to search! Please try \`!cg search help\` for the map!`);
        
        const searchArea = args.join(' ');

        if(searchArea === "map") {
            message.channel.send({
                embed: utils.embed(`Hide And Seek Map`, ``, [], {
                    image: 'https://cdn.glitch.com/4c61305b-bf1b-4486-87ba-eee8d21424a6%2FFullMap.jpg?1524045676643'
                })
            });
        } else if (searchArea === "help") {
            message.channel.send({
                embed: utils.embed(`Hide And Seek`, stripIndents`
                \`\`\`markdown
                ## Hide And Seek With Copper ##
                Copper loves hiding. Find him to earn 15 CG$!

                Discordia exists from 8 different areas:
                [1](HypeSquad Facility)
                [2](Nitro Factory)
                [3](User Database)
                [4](Bot Operation Rooms)
                [5](Game Lookout)
                [6](Partners Lounge)
                [7](Wumpus Habitat)
                [8](Elite Samurai Training Grounds or ESTG)

                Use <!cg search map> for the map of Discordia!
                \`\`\`
                `)
            });
        } else {
        let searchSentence;
        if(searchArea === areas()) {
            economy.updateBalance(message.author.id, 15);

            searchSentence = "And found Copper! As a reward, you got 15 CG$!";
        } else {
            searchSentence = `But you didn't find Copper... Better luck next time!\n\nCopper was located in: ${areas()}`;
        }

        message.channel.send({    
            embed: utils.embed(`You searched in ${searchArea}...`, `${searchSentence}`)
        });
    }
    }
};

module.exports.help = {
    command: 'search'
};