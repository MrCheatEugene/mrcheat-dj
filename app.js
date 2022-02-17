try{

const yt = require('youtube-info-streams');
const { Client, Intents } = require('discord.js');
const { token,guildId } = require('./config.json');
// Create a new client instance

const fs = require('fs');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const play = require('play-dl'); // Everything
const { Spotify } = require('spotify-it')
let resource;
const { MessageAttachment } = require('discord.js');
const client = new Client({ intents: myIntents });
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

const spotify = new Spotify({
	id: 'id',
	secret: 'secret',
	defaultLimit: 10 // default track limit for playlist & album
}) // secert & id c
const player = createAudioPlayer();
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('игры');
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

		const { commandName } = interaction;
		if (interaction.commandName === 'play') {
const url = interaction.options.getString('url');
if (url == undefined)  {
	await interaction.reply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
}else{

const connection = joinVoiceChannel({
	channelId: interaction.member.voice.channel.id,
	guildId: interaction.member.guild.id,
	adapterCreator:interaction.member.voice.guild.voiceAdapterCreator,
});
 let searched;
        //https://open.spotify.com/track/7CCCX50zGHMTuHsyKQy03l
        if (Spotify.validate(url, 'TRACK')) {
        let sp_data = await play.spotify(url) // This will get spotify data from the url [ I used track url, make sure to make a logic for playlist, album ]
        
         searched = await play.search(`${sp_data.name}`, {
            limit: 1
        }) // This will search the found track on youtube.
    }else{
       searched = await play.search(url, {
            limit: 1
        }) 	
    }

const video = await yt.info(searched[0].id);
if(video['videoDetails']['isFamilySafe'] ==false){
	await interaction.reply({content:"Данное видео не может быть воспроизведено т.к имеет возрастные ограничения"});
}else{
        let stream = await play.stream(searched[0].url) // This will create stream from the above search
         resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        player.play(resource);
        let urlThumb;
        if ( searched[0].thumbnails == undefined) { urlThumb =""}else{
        	 urlThumb=searched[0].thumbnails[0].url;
        }
        console.log(searched);
const exampleEmbed = {
	title: searched[0].title,
	description: searched[0].url,
	image: {
		url: urlThumb,
	},
};

        connection.subscribe(player)
		await interaction.reply({ embeds: [exampleEmbed]});		
}}}
		if (interaction.commandName === 'stop') {
			if (player !==undefined) {
				player.stop();
				interaction.reply("Остановлено.");
			}else{
					await interaction.reply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
			}
			}
			if (interaction.commandName === 'pause') {
			if (player !==undefined) {
				player.pause();
				interaction.reply("Пристановлено.");
			}else{
					await interaction.reply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
			}}

			if (interaction.commandName === 'resume') {
			if (player !==undefined) {
				player.unpause();
				interaction.reply("Возобновлено.");
				}else{
					await interaction.reply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
			}
		}
			if (interaction.commandName === 'showpenis') {
					await interaction.reply({content: "НЕГАЙНО ПОКАЖИ ПЕНИС \n https://www.youtube.com/watch?v=vXGTO7Ftro4"});
		}
			if (interaction.commandName === 'setvol') {
				const vol = interaction.options.getInteger('volume')/100;
				//resource.volume = (vol);
				console.log(player);
				interaction.reply("Громкость изменена.");
		}	
});
// Login to Discord with your client's token
client.login(token);
}catch(err){
	console.log("Error: "+err);
}
	