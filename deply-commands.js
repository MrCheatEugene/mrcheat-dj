const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Pong'),
	new SlashCommandBuilder().setName('stop').setDescription('Остановить воспроизведение'),
	new SlashCommandBuilder().setName('pause').setDescription('Приостановить воспроизведение'),
	new SlashCommandBuilder().setName('resume').setDescription('Возобновить воспроизведение'),
	new SlashCommandBuilder().setName('showpenis').setDescription('Негайно покажи пенис'),
	new SlashCommandBuilder().setName('setvol').setDescription('Установить громкость проигрывателя').addIntegerOption(option => option.setName('volume').setDescription('Громкость')),
	new SlashCommandBuilder().setName('play').setDescription('Воспроизвести Youtube видео/Песню из Spotify/найти песню(в параметре url пиши поисковый запрос)')	.addStringOption(option => option.setName('url').setDescription('Ссылка на видео')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);