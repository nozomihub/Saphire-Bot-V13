const { e } = require('../../../Routes/emojis.json')
const Colors = require('../../../Routes/functions/colors')
const ms = require('parse-ms')

// #246FE0 - Azul Saphire
module.exports = {
    name: 'cooldown',
    aliases: ['cd', 'timeouts', 'tm'],
    category: 'util',
    emoji: '⏱️',
    usage: '<cooldown> <@user/id>',
    description: 'Verifique os seus tempos',

    run: async (client, message, args, prefix, db, MessageEmbed, request) => {

        let user = message.mentions.members.first() || message.mentions.repliedUser || message.guild.members.cache.get(args[0]) || message.member
        if (!user) return message.reply(`${e.Deny} | Eu não achei, o que será que aconteceu?`)

        let TPreso, TDaily, TPig, TWork, TRestoreDividas, TCu, TRoleta, TCrime, TBit, TLikes, THelpier, TWeek, TMonth, TReact, TAssalto, TRob
        let Dpn = `${e.Check} \`Disponível\``

        // Timeout Preso
        let TempoPreso = ms(1500000 - (Date.now() - db.get(`${user.id}.Timeouts.Preso`)))
        if (db.get(`${user.id}.Timeouts.Preso`) !== null && 1500000 - (Date.now() - db.get(`${user.id}.Timeouts.Preso`)) > 0) {
            TPreso = `${e.Loading} \`${TempoPreso.minutes}m e ${TempoPreso.seconds}s\``
        } else { TPreso = Dpn }

        // Timeout Daily
        let TimeDaily = ms(86400000 - (Date.now() - db.get(`${user.id}.Timeouts.Daily`)))
        if (db.get(`${user.id}.Timeouts.Daily`) !== null && 86400000 - (Date.now() - db.get(`${user.id}.Timeouts.Daily`)) > 0) {
            TDaily = `${e.Loading} \`${TimeDaily.hours}h, ${TimeDaily.minutes}m, e ${TimeDaily.seconds}s\``
        } else { TDaily = Dpn }

        // Timeout Pig
        let TimePig = ms(30000 - (Date.now() - db.get(`${user.id}.Timeouts.Porquinho`)))
        if (db.get(`${user.id}.Timeouts.Porquinho`) !== null && 30000 - (Date.now() - db.get(`${user.id}.Timeouts.Porquinho`)) > 0) {
            TPig = `${e.Loading} \`${TimePig.seconds}s\``
        } else { TPig = Dpn }

        // Timeout Work
        let TimeWork = ms(66400000 - (Date.now() - db.get(`${user.id}.Timeouts.Work`)))
        if (db.get(`${user.id}.Timeouts.Work`) !== null && 66400000 - (Date.now() - db.get(`${user.id}.Timeouts.Work`)) > 0) {
            TWork = `${e.Loading} \`${TimeWork.hours}h, ${TimeWork.minutes}m, e ${TimeWork.seconds}s\``
        } else { TWork = Dpn }

        // Timeout RestoreDividas
        let TimeRestoreDividas = ms(86400000 - (Date.now() - db.get(`Client.Timeouts.RestoreDividas`)))
        if (db.get(`Client.Timeouts.RestoreDividas`) !== null && 86400000 - (Date.now() - db.get(`Client.Timeouts.RestoreDividas`)) > 0) {
            TRestoreDividas = `${e.Loading} \`${TimeRestoreDividas.hours}h, ${TimeRestoreDividas.minutes}m, e ${TimeRestoreDividas.seconds}s\``
        } else { TRestoreDividas = Dpn }

        // Timeout Cu
        let TimeCu = ms(600000 - (Date.now() - db.get(`${user.id}.Timeouts.Cu`)))
        if (db.get(`${user.id}.Timeouts.Cu`) !== null && 600000 - (Date.now() - db.get(`${user.id}.Timeouts.Cu`)) > 0) {
            TCu = `${e.Loading} \`${TimeCu.minutes}m e ${TimeCu.seconds}s\``
        } else { TCu = Dpn }

        // Timeout Roleta
        let TimeRoleta = ms(2400000 - (Date.now() - db.get(`${user.id}.Timeouts.Roleta`)))
        if (db.get(`${user.id}.Timeouts.Roleta`) !== null && 2400000 - (Date.now() - db.get(`${user.id}.Timeouts.Roleta`)) > 0) {
            TRoleta = `${e.Loading} \`${TimeRoleta.minutes}m e ${TimeRoleta.seconds}s\``
        } else { TRoleta = Dpn }

        // Timeout Crime
        let TimeCrime = ms(1200000 - (Date.now() - db.get(`${user.id}.Timeouts.Crime`)))
        if (db.get(`${user.id}.Timeouts.Crime`) !== null && 1200000 - (Date.now() - db.get(`${user.id}.Timeouts.Crime`)) > 0) {
            TCrime = `${e.Loading} \`${TimeCrime.minutes}m e ${TimeCrime.seconds}s\``
        } else { TCrime = Dpn }

        // Timeout Bitcoin
        let TimeBitcoin = ms(7200000 - (Date.now() - db.get(`${user.id}.Timeouts.Bitcoin`)))
        if (db.get(`${user.id}.Timeouts.Bitcoin`) !== null && 7200000 - (Date.now() - db.get(`${user.id}.Timeouts.Bitcoin`)) > 0) {
            TBit = `${e.Loading} \`${TimeBitcoin.hours}h ${TimeBitcoin.minutes}m e ${TimeBitcoin.seconds}s\``
        } else { TBit = Dpn }

        // Timeout Likes
        let TimeLikes = ms(1800000 - (Date.now() - db.get(`${user.id}.Timeouts.Rep`)))
        if (db.get(`${user.id}.Timeouts.Rep`) !== null && 1800000 - (Date.now() - db.get(`${user.id}.Timeouts.Rep`)) > 0) {
            TLikes = `${e.Loading} \`${TimeLikes.minutes}m e ${TimeLikes.seconds}s\``
        } else { TLikes = Dpn }

        // Timeout Helpier
        let TimeHelpier = ms(604800000 - (Date.now() - db.get(`${user.id}.Slot.Helpier`)))
        if (db.get(`${user.id}.Slot.Helpier`) !== null && 604800000 - (Date.now() - db.get(`${user.id}.Slot.Helpier`)) > 0) {
            THelpier = `${e.Loading} \`${TimeHelpier.days}d ${TimeHelpier.hours}h ${TimeHelpier.minutes}m e ${TimeHelpier.seconds}s\``
        } else { THelpier = `${e.Deny} \`Indisponível\`` }

        // Timeout Semanal
        let TimeWeek = ms(604800000 - (Date.now() - db.get(`${user.id}.Timeouts.Weekly`)))
        if (db.get(`${user.id}.Timeouts.Weekly`) !== null && 604800000 - (Date.now() - db.get(`${user.id}.Timeouts.Weekly`)) > 0) {
            TWeek = `${e.Loading} \`${TimeWeek.days}d ${TimeWeek.hours}h ${TimeWeek.minutes}m e ${TimeWeek.seconds}s\``
        } else { TWeek = Dpn }

        // Timeout Mensal
        let TimeMonth = ms(2592000000 - (Date.now() - db.get(`${user.id}.Timeouts.Monthly`)))
        if (db.get(`${user.id}.Timeouts.Monthly`) !== null && 2592000000 - (Date.now() - db.get(`${user.id}.Timeouts.Monthly`)) > 0) {
            TMonth = `${e.Loading} \`${TimeMonth.days}d ${TimeMonth.hours}h ${TimeMonth.minutes}m e ${TimeMonth.seconds}s\``
        } else { TMonth = Dpn }

        // Timeout Assalto
        let TimeAssalto = ms(1200000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Assalto`)))
        if (db.get(`${message.author.id}.Timeouts.Assalto`) !== null && 1200000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Assalto`)) > 0) {
            TAssalto = (`${e.Loading} \`${TimeAssalto.minutes}m e ${TimeAssalto.seconds}s\``)
        } else { TAssalto = Dpn }

        // Timeout Roubo
        let TimeRoubo = ms(1200000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Roubo`)))
        if (db.get(`${message.author.id}.Timeouts.Roubo`) !== null && 1200000 - (Date.now() - db.get(`${message.author.id}.Timeouts.Roubo`)) > 0) {
            TRob = (`${e.Loading} \`${TimeRoubo.minutes}m e ${TimeRoubo.seconds}s\``)
        } else { TRob = Dpn }

        // Timeout Reacts
        let TimeReacts = ms(40000 - (Date.now() - db.get('Client.React')))
        if (db.get('Client.React') !== null && 40000 - (Date.now() - db.get('Client.React')) > 0) {
            TReact = `${e.Loading} \`${TimeReacts.seconds}s\``
        } else { TReact = Dpn }

        if (['global', 'globais', 'saphire'].includes(args[0]?.toLowerCase()))
            return SendCooldownsSaphire()

            const Embed = new MessageEmbed()
                .setColor(Colors(user))
                .setTitle(`⏱️ ${client.user.username} Timeouts | ${user.user.username}`)
                .setDescription('Aqui você pode conferir todos os timeouts.')
                .addFields(
                    {
                        name: `${e.Cadeia} Preso`,
                        value: TPreso || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${e.Helpier} Ajudante`,
                        value: THelpier || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}mensal`,
                        value: TMonth || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}semanal`,
                        value: TWeek || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}daily`,
                        value: TDaily || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}work`,
                        value: TWork || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}pig`,
                        value: TPig || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}cu`,
                        value: TCu || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}roleta`,
                        value: TRoleta || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}crime`,
                        value: TCrime || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}assaltar`,
                        value: TAssalto || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}roubar`,
                        value: TRob || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}bitcoin`,
                        value: TBit || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: `${prefix}like`,
                        value: TLikes || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                )
                .setFooter(`${prefix}cd Saphire`)
            return message.reply({ embeds: [Embed] })

        function SendCooldownsSaphire() {
            const Embed = new MessageEmbed()
                .setColor(Colors(user))
                .setTitle(`⏱️ ${client.user.username} Timeouts | Global`)
                .setDescription('Timeouts Globais')
                .addFields(
                    {
                        name: `${e.MoneyWings} Restaurar Dívida`,
                        value: TRestoreDividas || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                    {
                        name: 'Reações Automáticas',
                        value: TReact || `\`Você não deveria ver essa mensagem... Usa "${prefix}bug", por favor?\``
                    },
                )
            return message.reply({ embeds: [Embed] })
        }
    }
}