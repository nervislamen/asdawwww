//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar');

//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

module.exports = async client => { 

//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar 
const roller = ayarlar.roller
const botconfig = ayarlar.config 

//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

client.on("message", async message => {

        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","??ubat").replace("03","Mart").replace("04", "Nisan").replace("05", "May??s").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "A??ustos").replace("09", "Eyl??l").replace("10","Ekim").replace("11","Kas??m").replace("12","Aral??k")
const ry??l = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ry??l} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let discowbotc = chalk.magenta("Discow / Visteria")

const logc = message => {
  console.log(chalk.bold(`${discowbotc} ${tarihc} `+chalk.red(message)))
}

const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel

const prefix = ayarlar.bot.prefix

        if (!message.content.startsWith(prefix)) return;
let command = message.content.split(' ')[0].slice(prefix.length);
let params = message.content.split(' ').slice(1);
let cmd;

        if (!client.commands.has(command)) {
        if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
} else {
        if(command == '') return;
}
}

        if (client.commands.has(command)) {
    cmd = client.commands.get(command);
} else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

        if (cmd) {

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${botconfig.footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
        
function gonder(mesaj) {
  mkanal.send(discow.setDescription(mesaj)).then(x => x.delete({ timeout: 15000 }))
}

function hata(mesaj) {
  mkanal.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`)).then(x => x.delete({ timeout: 15000 }))
}

const kanal = client.channels.cache.get(kanallar.komutlog)
        
        if(!kanal) return hata(`**\`Komut Log\` Kanal??n?? Bulam??yorum.**`)

    cmd.run(client, message, params).catch(err => {

    kanal.send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${dikkat} **Komutta Bir Hata Olu??tu.** ${dikkat}

${ok} **Komutu Kullanan :** **${msahip}**
${ok} **Komutu Kullanan ID :** **\`${msahip.id}\`**

${ok} **Kullan??lan Komut :** **\`${prefix+command}\`**

${ok} **Tarih :** **[\`${rcre}\`]**`)
.addField(`${ok} **Hata :**`, `**\`\`\`js\n${err}\`\`\`**`))
kanal.send(`${botayar.sahipler.map(x => `<@${x}>`)}`)

})

    logc("Bir Komut Kullan??ld??. / Kullan??lan Komut : "+prefix+command+" / Komutun Ad?? : "+client.aliases.get(command))

    kanal.send(discow.setTitle(`${client.guilds.cache.get(ayarlar.config.botswid).name}`).setDescription(`${tik} **Bir Komut Kullan??ld??.** ${tik}
    
    ${ok} **Komutu Kullanan :** **${msahip} / (\`${msahip.tag}\`)**
    ${ok} **Komutu Kullanan ID :** **\`${msahip.id}\`**

    ${ok} **Komutun Kullan??ld?????? Sunucu :** **\`${msunucu.name}\`**
    ${ok} **Komutun Kullan??ld?????? Sunucu ID :** **\`${msunucu.id}\`**
    
    ${ok} **Kullan??lan Komut :** **\`${prefix+command}\`**
    ${ok} **Mesaj :**
    **\`\`\`js\n${message.content}\`\`\`**
    ${ok} **Tarih :** **[\`${rcre}\`]**`))

}})};

