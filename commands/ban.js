const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;

  let j = args.join(' ');
  let reason = j.split(args[0])[1];

  if (!reason) return message.channel.send('you must provide a valid reason.')
  
  if (message.member.hasPermission("BAN_MEMBERS")) {
   let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args[0].toLowerCase())) || message.mentions.users.first() || bot.users.cache.find(user => user.id === args[0]);
    if (user) {
      if (user.id === bot.user.id) return;
      const member = message.guild.member(user);
      if (member) {
        message.channel.send(`Are you sure you want to ban **${user.tag}** (yes/no)`);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', message => {
            if (message.content == "yes") {
                member.ban({ reason: "eliminated by podelbot" })
                .then(async () => {
                  /*xp[user.id] = {
                    xp: 0,
                    level: 1
                  };*/
                  await user.send("you've been banned from Podel Server (Reason:" + reason + ")")
                  await message.reply(
                    `Successfully banned ${user.tag} (Reason:${reason})`
                  );
                  let embed = new Discord.MessageEmbed()
                    .setTitle(`${user.tag} | Ban`)
                    .addField("Reason", reason, true)
                    .addField("Mod/Admin", message.author.tag, true)
                    .setThumbnail(user.displayAvatarURL())
                    .setColor(colour)
                    .setTimestamp()
                    .setFooter("Podel, get fucked dude", bot.user.avatarURL());
                await db.add(`banCount_${user.id}`, 1);
                await bot.guilds.cache
                .get("696515024746709003")
                .channels.cache.get("704356972606259220")
                .send(embed);              })
              .catch(err => {
                console.error(err);
              });
            } 
            else if (message.content == "no") {
                message.channel.send("cancelled.");
                return;
            }
        });
     }
    } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }

module.exports.help = {
  name: "ban"
}
