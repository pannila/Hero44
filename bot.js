const Discord = require('discord.js');
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const colors = ["RANDOM"];
const stop = [];
async function color () {
    forEachTimeout(colors, (color) => {
        client.guilds.forEach((guild) => {
                if (!stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Hero');
                if (role && role.editable) 
                    role.setColor(color);
            }  
        })
    }, 800).then(color);
}
client.on('ready', () => {
    color();
});
client.on('guildCreate', (guild) => {
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('by (`youssef_tube#5800`)');
});    
client.on('message', (message) => {
    if (message.channel.type !== 'text') return;
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR') || message.member.id === message.guild.owner.id) {
        if (message.content === ',herostop') {stop.push(message.guild.id); return message.channel.send('hero is stopping');}
        if (message.content === ',herostart') {stop.splice(stop.indexOf(message.guild.id),1); return message.channel.send('hero is starting');}
    }
})
client.login(process.env.BOT_TOKEN);
