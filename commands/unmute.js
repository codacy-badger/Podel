const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('MANAGE_MESSAGES')) {
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!user) return message.channel.send("user not found.");
        
    if (user) {
              
      var role = message.guild.roles.find(role => role.name === "Muted");
      let muted = db.fetch(`muted_${message.author.id}`);
      
      if (!user.roles.some(role => role.name === "Muted")) return message.channel.send(`that user is already unmuted.`)
      
      let embed = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Unmute`)
      .addField('Mod/Admin', message.author.tag, true)
      .setThumbnail(user.user.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      
      await (message.delete());
      
      await bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed);

      await user.removeRole(role);
      
      await db.delete(`muted_${user.user.id}`);

    }
  }
};

module.exports.help = {
  name: "unmute",
  aliases: ['um', 'unsilence']
}