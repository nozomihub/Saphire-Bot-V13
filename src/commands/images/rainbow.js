const { MessageAttachment } = require('discord.js')
const { e } = require('../../../database/emojis.json')
const { Canvas } = require('canvacord')
const Error = require('../../../Routes/functions/errors')

// #246FE0 - Azul Saphire
module.exports = {
    name: 'rainbow',
    aliases: ['arco-iris'],
    category: 'images',
    ClientPermissions: ['ATTACH_FILES'],
    emoji: '🌈',
    usage: '<rainbow> [@user]',
    description: 'Rainbow meme',

    run: async (client, message, args, prefix, db, MessageEmbed, request, sdb) => {

        let user = message.mentions.users.first() || message.mentions.repliedUser  || await client.users.cache.get(args[0]) || message.author
        let avatar = user.displayAvatarURL({ format: 'png' })

        try {
            return message.reply(`${e.Loading} | Carregando...`).then(async msg => {
                msg.delete().catch(() => { })
                message.reply({ files: [new MessageAttachment(await Canvas.rainbow(avatar), 'rainbow.png')] })
            })
        } catch (err) {
            Error(message, err)
        }
    }
}