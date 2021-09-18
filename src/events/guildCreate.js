const client = require('../../index')
const { MessageEmbed, Permissions } = require('discord.js')
const { e } = require('../../Routes/emojis.json')
const db = require('quick.db')
const { config } = require('../../Routes/config.json')

client.on("guildCreate", async (guild) => {

    if (!guild.available) return
    db.set(`Servers.${guild.id}`, guild.name)

    let owner = await guild.fetchOwner()
    let CanalDeConvite = await guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(Permissions.FLAGS.CREATE_INSTANT_INVITE))
    const channel = await client.channels.cache.get(config.guildCreateChannelId)
    if (!channel) return

    const Embed = new MessageEmbed().setColor('GREEN').setTitle(`${e.Loud} Um servidor me adicionou`).setDescription('Registro no banco de dados com concluido!').addField('Status', `**Dono:** ${owner.user.tag} *\`(${owner.user.id})\`*\n**Membros:** ${guild.memberCount}`)
   
    function WithChannel() {
        CanalDeConvite.createInvite({ maxAge: 0 }).then(ChannelInvite => {
            Embed.addField('Servidor', `[${guild.name}](${ChannelInvite.url}) *\`(${guild.id})\`*`)
            channel.send({ embeds: [Embed] }).catch(err => { })
        }).catch(() => { WithoutChannel() })
    }

    function WithoutChannel() {
        Embed.addField('Servidor', `${guild.name} *\`(${guild.id})\`*`)
        channel.send({ embeds: [Embed] }).catch(err => { })
    }

    CanalDeConvite ? WithChannel() : WithoutChannel()
})