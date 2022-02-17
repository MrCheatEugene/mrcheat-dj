
// БОТ DEPRECATED И ОН ТИПА ВСЁ

const Discord = require('v11-discord.js');
const client = new Discord.Client();
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
client.login('TOKENHERE');

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;
  if (message.content == '/dc') {try{
          if (typeof message.member.voiceChannel !== 'undefined') {
message.member.voiceChannel.leave();
message.channel.send('Отключился!');
    }}catch(err){
  console.log(err);
  message.channel.send("Произошла ошибка.");
 }
   }
 if (message.content.includes('/setvol') ===true) {
  try{    
          if (typeof message.member.voiceChannel !== 'undefined') {
if(message.content.length >7){
  let vol = message.content.substring(8,11);
  if(isNaN(vol) == false){
    console.log(vol);
      message.member.voiceChannel.join()
        .then(connection => { connection.dispatcher.setVolume(vol);
          message.channel.send('Громкость изменена на '+vol+'.');
 });}
    }else{
      message.channel.send('Ошибка. Громкость не является числом.');
    }}}
catch(err){
  console.log(err);
  message.channel.send("Произошла ошибка.");
 }

  }
     if (message.content.includes('/pause') ===true) {
                     try{
           if (typeof message.member.voiceChannel !== 'undefined') {
      message.member.voiceChannel.join()
        .then(connection => { connection.dispatcher.pause();
          message.channel.send('Приостановлено.')
 });}
   
}catch(err){
  console.log(err);
  message.channel.send("Произошла ошибка.");
 }}
    if (message.content.includes('/resume') ===true) {try{
          if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { connection.dispatcher.resume();
          message.channel.send('Возобновлено.')
 });}
   
}catch(err){
  console.log(err);
  message.channel.send("Произошла ошибка.");
 }}
  if (message.content.includes('/play') ===true) {
    if(message.content.length > 5){
      try{
          if (typeof message.member.voiceChannel !== 'undefined') {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
  const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
console.log(message.content.substring(6,9999));
    const stream = ytdl(message.content.substring(6,9999), { filter : 'audioonly' });
//let videoid = searchParams.toString();
let videoid =     (getParameterByName("v",message.content.substring(6,9999)));
    const dispatcher = connection.playStream(stream, streamOptions);
   const embed = new Discord.RichEmbed();
      // Set the title of the field
      const httpclient = require('http');
      const options = {
        method: 'GET',
  host: 'regoggles.mrcheat.ga',
  port: 80,
  path: '/video.php?v='+videoid

};
//console.log(options);
// Make a request
//console.log(searchParams.get("v"));
let res;
let videodetails;
httpclient.get(options, function(res) {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
  let embeddsta =(JSON.parse(body)['videodata']);
  console.log(embeddsta);
  embed.setTitle("Сейчас играет: "+ embeddsta['title']+" от "+embeddsta['author']);
  embed.setImage(embeddsta['thumbnail']['thumbnails']['3']['url']);
  embed.setDescription(embeddsta['shortDescription'].substring(0,75));
        message.channel.send(embed);

  });
});
    
        });}}catch(err){
  console.log(err);
  message.channel.send("Произошла ошибка.");
 }}
    } 
  }   );
