const utils = require("../utils");

const gifs = () => {
    return utils.randomSelection([
        "https://cdn.discordapp.com/attachments/413528785023926273/433787369045491712/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433786888009285662/forehead-slap-gif-3.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433787027067109386/4Vv51_s-200x150.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433787620988944414/tumblr_lz6w8dylst1qfgo1to1_500.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433787810202386443/skilleted-thumb-550x309-42339.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433788336164044820/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433788990089592854/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433789174202630145/tumblr_m4g2skkw2q1rwgpfjo1_400.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433789174663872532/tumblr_lioyrxj09r1qa38qko1_500.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433789549387186176/1zai.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433789675228889088/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433790251694030848/aWJO0_s-200x150.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433790600685289489/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433790636106448907/tenor.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433790817015037953/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433791550024318977/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433791738562347018/giphy_1.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433791760615997440/giphy.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433792302113095692/07878f3a412bd9337f6094875da2da59.gif",
        "https://cdn.discordapp.com/attachments/413528785023926273/433792418408562709/ronald-mcdonald-food-slap.gif"
    ]);
};

const selfGif = "https://cdn.discordapp.com/attachments/413528785023926273/433792061020307457/giphy.gif";

module.exports.run = (client, message, args) => {
    if(args.length < 1)
        return message.reply(`Please mention a user to slap!`);

    const slapper = message.author.username;
    const slappedUser = message.mentions.users.first().username;

    if(slappedUser === slapper)
        return message.channel.send({
            embed: utils.embed(`Slapping yourself? Ah well`, ``, [], {
                image: selfGif
            })
        });

    const slapSentences = () => {
        return utils.randomSelection([
            `${slapper} has slapped ${slappedUser}!`,
            `${slappedUser} got slapped by ${slapper}... That must've hurt`,
            `${slappedUser}, you have been slapped boi.`,
            `Slappidy slap slap on ${slappedUser}'s head!`,
            `I hath raised my hand against you, I smacketh thee, thy weeps, I laugh, foolish heretic, we will take Jerusalem, now step aside before I hit you again heathen. (Thanks Grill)`,
            `Congratulations, ${slappedUser}, you are slapped by ${slapper}`
        ]);
    };

    message.channel.send({
        embed: utils.embed(slapSentences(), ``, [], {
            image: `${gifs()}`
        })
    });
};

module.exports.help = {
    command: 'slap'
};