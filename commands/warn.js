const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('KICK_MEMBERS')) {
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!user) return message.channel.send("user not found.");
    
    let warns = db.fetch(`warnCount_${user.user.id}`);
        
    let reason = args.join(" ").slice(22);
        
    if (user) {
      
      let embed = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Warn`)
      .addField('Reason', reason, true)
      .addField('Mod/Admin', message.author.tag, true)
      .setThumbnail(user.user.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      
      await (message.delete());
      
      await db.add(`warnCount_${user.user.id}`, 1)
      
      await bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed);
      
    }
  }
};

module.exports.help = {
  name: "warn",
  aliases: ['w']
}