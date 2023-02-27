const { Client, Intents } = require('discord.js');
const {token} = require('./config.json');
var resources={};
var players={};
const fs = require('fs');
const subProcess = require('child_process')
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const play = require('play-dl'); // Everything
const { MessageAttachment } = require('discord.js');
const client = new Client({ intents: myIntents });
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	getVoiceConnection,
	createAudioResource,
	subscribe,
	joinVoiceChannel,
} = require('@discordjs/voice');

function getPlayer(gid){
	console.log(players)
	return players[gid];
}

function setPlayer(gid,player){
	console.log(players)
	players[gid]=player;
}

function resubplayer(gid){
	try{
		getPlayer(gid).play()
		getVoiceConnection(gid).subscribe(getPlayer(gid))
	}catch(e){
		console.log(e);
	}
}

function getResource(gid){
	return resources[gid];
}

function setResource(gid,res){
	resources[gid]=res;
}
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('игры');
});
client.on('interactionCreate', async interaction => {
		await interaction.deferReply();
		try{
			if (!interaction.isCommand()) return;
			const { commandName } = interaction;
			var gid= interaction.member.guild.id;
			var player=getPlayer(gid)
			if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
				var player = createAudioPlayer();
				setPlayer(gid,player)
			}
			setPlayer(gid,player)
			var resource=getResource(gid);
			if (interaction.commandName === 'ping') {
				await interaction.editReply({content: "https://www.youtube.com/watch?v=y8R6X5IDDtA"});
			}else if (interaction.commandName === 'lolz') {
				console.log(interaction.member.voice.channel);
				if(interaction.member.voice.channel == undefined){
					await interaction.editReply({content:"Зайдите в голосовой канал!"})
				}else{
					let connection = joinVoiceChannel({
						channelId: interaction.member.voice.channel.id,
						guildId: interaction.member.guild.id,
						adapterCreator:interaction.member.voice.guild.voiceAdapterCreator,
					});
				 	var player=getPlayer(gid)
					if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
						var player = createAudioPlayer();
						setPlayer(gid,player)
					}
					setPlayer(gid,player)
    				let cr=  createAudioResource("https://listen1.myradio24.com/lolz", {
						inlineVolume: true,
    				});
    				setResource(gid,cr);
    				setPlayer(gid,player);
    				player.play(cr);
    				setPlayer(gid,player);
					const exampleEmbed = {
						title: "LOLZTeam радио",
						description: "✅ LOLZTeam Радио, работаем ✅\n\nВся инфа: https://zelenka.guru/threads/4824288/",
						image: {
							url:"https://i.imgur.com/5gtG3DI.jpg"
						}
					};
					setPlayer(gid,player)
			        getVoiceConnection(gid).subscribe(getPlayer(gid))
					try{
						interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});	
					}catch(e){
						//console.log(e);
						interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});
					}
				}
			}else if (interaction.commandName === 'stream') {
				console.log(interaction.member.voice.channel);
				if(interaction.member.voice.channel == undefined){
					await interaction.editReply({content:"Зайдите в голосовой канал!"})
				}else{
					const data = interaction.options.getString('stream');
					if (url == undefined){
						interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"}).then(r=>{return;});
						return;
					}
					let connection = joinVoiceChannel({
						channelId: interaction.member.voice.channel.id,
						guildId: interaction.member.guild.id,
						adapterCreator:interaction.member.voice.guild.voiceAdapterCreator,
					});
				 	var player=getPlayer(gid)
					if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
						var player = createAudioPlayer();
						setPlayer(gid,player)
					}
					setPlayer(gid,player)
    				let cr=  createAudioResource(data, {
						inlineVolume: true,
    				});
    				setResource(gid,cr);
    				setPlayer(gid,player);
    				player.play(cr);
    				setPlayer(gid,player);
					const exampleEmbed = {
						title: "Аудио-стрим",
						description: "🎵 Стрим: "+data
					};
					setPlayer(gid,player)
			        getVoiceConnection(gid).subscribe(getPlayer(gid))
					try{
						interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});	
					}catch(e){
						//console.log(e);
						interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});
					}
				}
			}else if (interaction.commandName === 'playvk') {
				console.log(interaction.member.voice.channel);
				if(interaction.member.voice.channel == undefined){
					await interaction.editReply({content:"Зайдите в голосовой канал!"})
				}else{
					let connection = joinVoiceChannel({
						channelId: interaction.member.voice.channel.id,
						guildId: interaction.member.guild.id,
						adapterCreator:interaction.member.voice.guild.voiceAdapterCreator,
					});
	    			const url = interaction.options.getString('url');
					if (url == undefined){
						interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"}).then(r=>{return;});
					}else{
						let buff = new Buffer(url);
						let base64data = buff.toString('base64');
						const child = subProcess.spawn("/usr/bin/python3",["/test/musicbot/index.py","/test/musicbot/outvk.mp3",base64data.replace("\"",'\"')], {stdio : "inherit"});
						child.on('close', function() {
							const data = fs.readFileSync('/test/musicbot/outvk.txt',{encoding:'utf8', flag:'r'});
							if(data=='ERR_INVALID_URL'){
								interaction.editReply({content:"Воспроизведение трека по URL пока не поддерживается."}).then(r=>{return;});
							}else if(data=="ERR_FAILED_DOWNLOAD"){
								interaction.editReply({content:"Не удалось загрузить трек с ВК :("}).then(r=>{return;});
							}else{
							 	var player=getPlayer(gid)
								if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
									var player = createAudioPlayer();
									setPlayer(gid,player)
								}
								setPlayer(gid,player)
		        				let cr=  createAudioResource("./outvk.mp3", {
									inlineVolume: true,
		        				});
		        				setResource(gid,cr);
		        				setPlayer(gid,player);
		        				//console.log(player);
		        				player.play(cr);
		        				setPlayer(gid,player);
								const exampleEmbed = {
									title: data,
									description: "Воспроизведено через VK",
								};
								setPlayer(gid,player)
						        getVoiceConnection(gid).subscribe(getPlayer(gid))
								try{
									interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});	
								}catch(e){
									//console.log(e);
									interaction.editReply({ embeds: [exampleEmbed]}).then(r=>{return;});
								}
							}
					});
	    		}
		    }
		}else if (interaction.commandName === 'play') {
				const url = interaction.options.getString('url');
				if (url == undefined)  {
					await interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
				}else{
					console.log(interaction.member.voice.channel);
					if(interaction.member.voice.channel == undefined){
						await interaction.editReply({content:"Зайдите в голосовой канал!"})
					}else{
						let connection = joinVoiceChannel({
							channelId: interaction.member.voice.channel.id,
							guildId: interaction.member.guild.id,
							adapterCreator:interaction.member.voice.guild.voiceAdapterCreator,
						});
			 			let searched;
			 			console.log("URL: "+url);
			        	if (play.sp_validate(url) == 'track') {
			        		let sp_data = await play.spotify(url)
			        		sp_res = sp_data
			        		sp_artists = ""
			        		sp_data['artists'].forEach(artist=>{
			        			sp_artists+=artist['name']+";"
			        		})
			        		sp_artists = sp_artists.substring(0,sp_artists.length-1)
			        		trackInfo = {"title":sp_artists+" - "+sp_res['name'],"author":sp_artists,"thumb":sp_res['thumbnail']['url'],"url":sp_res['url'],"date":"Неизвестно","type":"sp","description":sp_res['url']};
				        	realUrl = "";
			    		}else if(play.yt_validate(url) == 'video'){
			    			let yt_data = await play.video_info(url);
							yt_data = JSON.parse(JSON.stringify(yt_data)).video_details;
			                console.log(yt_data);
				    		trackInfo = {"title":yt_data['title'],"author":yt_data['channel'],"thumb":"https://i.ytimg.com/vi/"+yt_data['id']+"/maxresdefault.jpg","canPlay":(yt_data.discretionAdvised == false||yt_data.private == false),"url":url,"date":yt_data.uploadedAt,"type":"yt","description":yt_data['description']};
			    		}else{
			    			//https://www.youtube.com/watch?v=-OfiiI-GiA8&ab_channel=LOKKISVault
			       			searched = await play.search(url, {
			            		limit: 1,source:{youtube:"video"}
			        		});
							if(play.yt_validate(searched[0].url) == 'video'){
			        	        let yt_data = await play.video_info(searched[0].url);
				                yt_data = JSON.parse(JSON.stringify(yt_data)).video_details;
			        	        console.log(yt_data);
				    			trackInfo = {"title":yt_data['title'],"author":yt_data['channel'],"thumb":"https://i.ytimg.com/vi/"+yt_data['id']+"/maxresdefault.jpg","canPlay":(yt_data.discretionAdvised == false||yt_data.private == false),"url":yt_data['url'],"date":yt_data.uploadedAt,"type":"yt","description":yt_data['description'].substring(0,90)};
				        	}else{
								trackinfo = undefined;
			       				realUrl = "";
							}
					   	}
					if(trackInfo == undefined){
						await interaction.editReply({content:"Ошибка! Не удалось получить информацию о видео, сервер не вернул данных"});
					}else{
						if (trackInfo['canPlay'] == false) {
							await interaction.editReply({content:"Данный трек не может быть воспроизведен, т.к либо YouTube поставил на видео маркер 18+, либо я без понятия."});
						}else{
							var mayDiffer = "";
							var stream;
							let canPlayResource = false;
							try{
			        			console.log(trackInfo);
			        			stream=  await play.stream(trackInfo['url']); // This will create stream from the above searc
			        			canPlayResource = true;
			     			}catch(e){
			     				if (trackInfo['type'] == 'sp') {
			     					try{
			     						mayDiffer="Внимание. Трек Spotify был подменён треком на YouTube, в связи с чем текущее аудио может **не соответствовать** запрошенному."
						        		let vid = await play.search(trackInfo['url'],{ source : { youtube : "video" },limit:1}) // This will create stream from the above searc
						        		stream = await play.stream(vid[0].url)
						        		console.log(stream)
						        		canPlayResource = true;
			     					}catch(e){
			     						try{
					   						await interaction.editReply('Ошибка воспроизведения. Воспользуйтесь воспроизведением треков с YouTube.')	
			     						}catch(e){
			     							console.log(e);
			     						}
				     				}
					     		}else{
					     			console.log(e);
					     			try{
					     				await interaction.editReply('Ошибка воспроизведения.')	
					     			}catch(e){
					     				console.log(e);
					     			}
					     		}
					     	}
				    	if(canPlayResource){
				    		var player=getPlayer(gid)
							if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
								var player = createAudioPlayer();
								setPlayer(gid,player)
							}
							setPlayer(gid,player)
				     		//	player=getPlayer(gid)
				     		console.log(stream);
				     		console.log(player);
				        	let cr=  createAudioResource(stream.stream, {
				            	inputType: stream.type,
								inlineVolume: true,
				        	});
				        	setResource(gid,cr);
				        	setPlayer(gid,player);
				        	//console.log(player);
				        	player.play(cr);
				        	setPlayer(gid,player);
							let urlThumb = trackInfo['thumb'];
							const exampleEmbed = {
								title: trackInfo['title'],
								description: trackInfo['description']+"\n Дата загрузки: "+trackInfo['date']+"\n"+mayDiffer,
								image: {
									url: urlThumb
								},
							};
							setPlayer(gid,player)
				        	getVoiceConnection(gid).subscribe(getPlayer(gid))
							try{
								await interaction.editReply({ embeds: [exampleEmbed]});	
							}catch(e){
								console.log(e);
								await interaction.editReply("Не удалось вывести информацию о треке.");
							}
						}
					}	
				}
			}
		}
	}
	var player=getPlayer(gid)
	if (typeof getPlayer(gid)=='undefined' || getPlayer(gid)!=undefined && (getPlayer(gid).play==undefined)){
		var player = createAudioPlayer();
		setPlayer(gid,player)
	}
	if (interaction.commandName === 'stop') {
		if (player !==undefined) {
			getVoiceConnection(gid).destroy()
			//player.stop();
			interaction.editReply("Остановлено.");
		}else{
			await interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
		}
	}
	if (interaction.commandName === 'pause') {
		if (player !==undefined) {
			player.pause();	
			//getVoiceConnection(gid).destroy();
			interaction.editReply("Пристановлено.");
		}else{
				await interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
		}
	}

	if (interaction.commandName === 'resume') {
		//var player=getPlayer(gid)
		if (player !==undefined) {
			player.unpause();
			resubplayer(gid)
			//connection.subscribe(player)
			interaction.editReply("Возобновлено.");
		}else{
			await interaction.editReply({content: "https://www.youtube.com/watch?v=vXGTO7Ftro4"});
		}
	}
	if (interaction.commandName === 'showpenis') {
		await interaction.editReply({content: "НЕГАЙНО ПОКАЖИ ПЕНИС \n https://www.youtube.com/watch?v=vXGTO7Ftro4"});
	}
	if (interaction.commandName === 'setvol') {
		const vol = interaction.options.getInteger('volume')/100;
		resource.volume.setVolume(vol);
		console.log(player);
		await interaction.editReply("Громкость изменена.");
		setResource(gid,resource)
	}
	console.log("setPlayer")
	setPlayer(gid,player)
	resubplayer(gid)	
	}catch(err){
		try{
			await interaction.editReply("Произошла **КРИТИЧЕСКАЯ** ошибка! Вот список вещей которые могли произойти: \n 1. Контент недоступен \n 2. Какому-то API не удалось получить аудио или информацию о нём. \n 3. Что-то сломалось \n **И что делать?** \n Попробуйте выполнить команду ещё раз, и посмотреть что изменилось.");
		}catch(e){
			console.log(e);
		}
		console.log(err);
		//	throw err;
	}
});


client.login(token);
