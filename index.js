const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "😁어서오세요😁";
const byeChannelName = "😭안녕히가세요😭";
const welcomeChannelComment = "안녕하세요! 저희 TEAM HAKUNA 에 오신걸 환영합니다. #🐣인증채널🐣 에서 인증해주세요.";
const byeChannelComment = "안녕히가세요. 다음에도 저희 TEAM HAKUNA를 찾아주세요. ";

client.on('ready', () => {
  console.log('MADE BY.HAKUNA#8636 HAKUNA BOT ON');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'TEAM HAKUNA란?') {
    return message.reply('```TEAM HAKUNA 란 각종프로그래머들이 모여있는팀입니다.``` ```각종정보를 공유하며 서로 배울 수 있는 자유로운 팀입니다.``` ```HAKUNA 란 없다 란 뜻입니다.``` ```저희팀에서 안될껀 없습니다.``` ```무엇이든 재밌는 팀생활 부탁드립니다.``` ```감사합니다.```');
  }

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/attachments/724862779667775538/725335830020882512/HAKUNA.png';
    let embed = new Discord.RichEmbed()
      .setTitle('HAKUNA 사이트')
      .setURL('http://www.naver.com')
      .setAuthor('HAKUNA', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', 'Some value here')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('HAKUNA BOT ❤️', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://cdn.discordapp.com/attachments/724862779667775538/725335830020882512/HAKUNA.png';
    let commandList = [
      {name: 'TEAM HAKUNA란?', desc: 'TEAM HAKUNA에 대한 설명'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of HAKUNA BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`HAKUNA BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('DM를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.HAKUNA#8636 에게 문의주세요.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);