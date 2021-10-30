
const { e } = require('../../../Routes/emojis.json')
const { config } = require('../../../Routes/config.json')
const ms = require("parse-ms")
const Moeda = require('../../../Routes/functions/moeda')
const Colors = require('../../../Routes/functions/colors')

module.exports = {
    name: 'weekly',
    aliases: ['semanal', 'semana'],
    category: 'economy2',
    emoji: `${e.Coin}`,
    usage: '<weekly>',
    description: 'Pegue uma recompensa semanalmente',

    run: async (client, message, args, prefix, db, MessageEmbed, request) => {

        if (['info', 'help', 'ajuda'].includes(args[0]?.toLowerCase()))
            return WeekInfo()

        // 604800000 ---> 7 dias
        let time = ms(604800000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Weekly`)))
        if (db.get(`${message.author.id}.Timeouts.Weekly`) !== null && 604800000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Weekly`)) > 0)
            return message.reply(`${e.Deny} | Epa! Espere mais \`${time.days}d ${time.hours}h, ${time.minutes}m, e ${time.seconds}s\``)

        let vip = db.get(`Vip_${message.author.id}`) || false
        message.guild.id === config.guildId ? InsideGuild() : OutsideGuild()

        function InsideGuild() {
            let amountcoins = parseInt(Math.floor(Math.random() * 100000) + 1)
            let amountxp = parseInt(Math.floor(Math.random() * 3000) + 1)
            let Bonus1 = parseInt(Math.floor(Math.random() * 100000) + 1)
            let Bonus2 = parseInt(Math.floor(Math.random() * 3000) + 1)

            if (vip) {
                let MoneyVipBonus = parseInt(Math.floor(Math.random() * amountcoins))
                let XpVipBonus = parseInt(amountxp + Math.floor(Math.random() * 100))
                amountcoins = (amountcoins + MoneyVipBonus)
                amountxp = (amountxp + XpVipBonus)
            }

            db.add(`Bank_${message.author.id}`, amountcoins)
            db.add(`Xp_${message.author.id}`, amountxp)
            db.add(`Balance_${message.author.id}`, Bonus1)
            db.add(`Xp_${message.author.id}`, Bonus2)
            db.set(`${message.author.id}.Timeouts.Weekly`, Date.now())

            let ComVip = `Bônus ${e.VipStar} | Você adquiriu +${amountcoins} ${Moeda(message)} e +${amountxp} ${e.RedStar} XP\n${e.SaphireHi} | Bônus: +${Bonus1} ${Moeda(message)} e +${Bonus2} ${e.RedStar} XP`
            let NoVip = `${e.Check} | Você adquiriu +${amountcoins} ${Moeda(message)} e +${amountxp} ${e.RedStar} XP\n${e.SaphireHi} | Bônus: +${Bonus1} ${Moeda(message)} e +${Bonus2} ${e.RedStar} XP`

            vip ? message.reply(ComVip) : message.reply(NoVip)
        }

        function OutsideGuild() {
            let amountcoins = parseInt(Math.floor(Math.random() * 80000) + 1)
            let amountxp = parseInt(Math.floor(Math.random() * 1000) + 1)

            if (vip) {
                let BonusVipMoney = Math.floor(Math.random() * amountcoins)
                let BonusVipXp = Math.floor(Math.random() * amountxp)

                prizemoney = amountcoins + BonusVipMoney
                prizexp = amountxp + BonusVipXp
            }

            db.add(`Bank_${message.author.id}`, amountcoins)
            db.add(`Xp_${message.author.id}`, amountxp)
            db.set(`${message.author.id}.Timeouts.Weekly`, Date.now())

            let NoVip = `${e.Check} | Você adquiriu +${amountcoins} ${Moeda(message)} e +${amountxp} ${e.RedStar} XP\n${e.SaphireObs} | Sabia que se você der \`${prefix}weekly\` dentro do meu servidor você pode ganhar até 4x a mais?`
            let WithVip = `Bônus ${e.VipStar} | Você adquiriu +${amountcoins} ${Moeda(message)} e +${amountxp} ${e.RedStar} XP\n${e.SaphireObs} | Sabia que se você der \`${prefix}weekly\` dentro do meu servidor você pode ganhar até 4x a mais?`

            vip ? message.reply(WithVip) : message.reply(NoVip)

        }

        function WeekInfo() {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(Colors(message.member))
                        .setTitle(`${e.SaphireHi} ${client.user.username} Daily`)
                        .setDescription(`O meu Weekly é um pouco diferenciado. Tem vários tipos de recompensas e você pode pegar algumas delas com uma pitada de sorte.`)
                        .addFields(
                            {
                                name: '⏱️ Cooldown:',
                                value: `7 dias - Confira seu tempo restante usando \`${prefix}cd\``
                            },
                            {
                                name: `${e.SaphireObs} Servidor Oficial`,
                                value: `Você ganha o seu weekly mais um bônus usando o comando dentro do meu [servidor oficial](${config.ServerLink})`
                            },
                            {
                                name: `${e.VipStar} Vip`,
                                value: `Os Vips tem uma vantagem no weekly. Eles recebem uma porcentagem aleatória do próprio weekly. Se eles pegarem 8000 ${Moeda(message)}, o vip irá te adicionar mais um valor aleatório dos 8000. Quer saber mais? Use \`${prefix}vip\``
                            },
                            {
                                name: `${e.SaphireTimida} Fora do servidor oficial`,
                                value: `Weekly fora do [servidor oficial](${config.ServerLink}) te garante o valor padrão, nada mais.`
                            },
                            {
                                name: `${e.PandaProfit} Recompensas`,
                                value: `O weekly te fornece uma quantia aleatória de **1 a 8000 ${Moeda(message)}** + **1 a 1000 XP ${e.RedStar}**`
                            },
                            {
                                name: `${e.Gear} Comando e atalhos`,
                                value: `\`${prefix}weekly\` \`${prefix}semanal\` \`${prefix}semana\``
                            }
                        )
                ]
            })
        }

    }
}