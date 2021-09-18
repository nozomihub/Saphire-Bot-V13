const { e } = require('../../../Routes/emojis.json')
const { f } = require('../../../Routes/frases.json')
const ms = require("parse-ms")

module.exports = {
    name: 'cu',
    aliases: ['anus', 'bunda', 'traseiro'],
    category: 'economy',
    UserPermissions: '',
    ClientPermissions: 'ADD_REACTIONS',
    emoji: `${e.Attention}`,
    usage: '<cu>',
    description: 'Você daria seu traseiro por dinheiro?',

    run: async (client, message, args, prefix, db, MessageEmbed, request) => {

        let timeout = 600000
        let author = db.get(`User.${message.author.id}.Timeouts.Cu`)

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author))

            return message.reply(`${e.Deny} | Pelo bem do seu querido anûs, espere mais \`${time.minutes}m e ${time.seconds}s\``)
        } else {

            if (request) return message.reply(`${e.Deny} | ${f.Request}`)

            return message.reply(`${e.Attention} | O anús é algo valioso, você realmente deseja entrega-lo por dinheiro?`).then(msg => {
                db.set(`User.Request.${message.author.id}`, 'ON')
                msg.react('✅').catch(err => { }) // e.Check
                msg.react('❌').catch(err => { }) // X

                const filter = (reaction, user) => { return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id }

                msg.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] }).then(collected => {
                    const reaction = collected.first()

                    if (reaction.emoji.name === '✅') {

                        let winlose = ['win', 'lose']
                        let result = winlose[Math.floor(Math.random() * winlose.length)]
                        let din = Math.floor(Math.random() * 100) + 1

                        if (result === "win") {
                            db.delete(`User.Request.${message.author.id}`)
                            db.add(`Balance_${message.author.id}`, din)
                            db.set(`User.${message.author.id}.Timeouts.Cu`, Date.now())
                            return msg.edit(`${e.Check} | ${message.author}, o cliente anônimo gostou dos seus serviços e te pagou +${din}${e.Coin} Moedas`)
                        } else {
                            db.delete(`User.Request.${message.author.id}`)
                            db.subtract(`Balance_${message.author.id}`, din)
                            db.set(`User.${message.author.id}.Timeouts.Cu`, Date.now())
                            return msg.edit(`${e.Deny} | ${message.author}, o cliente anônimo não gostou dos seus serviços e seu prejuízo foi de -${din}${e.Coin} Moedas`)
                        }
                    } else {
                        msg.edit(`${e.Deny} | Comando cancelado`)
                        msg.reactions.removeAll().catch(err => { })
                    }
                }).catch(() => {
                    msg.edit(`${e.Deny} | Comando cancelado | Tempo expirado`)
                })

            })
        }
    }
}
