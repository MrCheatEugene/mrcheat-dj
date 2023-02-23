# coding=utf-8
from telethon import TelegramClient, events, sync
import sys,requests,asyncio,os,base64,json
'''
Заметка от меня:
Да, это костыль. Я потратил несколько часов на поиски рабочего метода по скачке музыки из ВК.
По итогу выбрал самый простейший = юзербот. 

Если кто знает, как правильно можно получить трек из ВК, то пишите мне в ВК: vk.com/mrcheatyt, или в дискорд: undefined#9440
'''

sys.argv[2]=base64.b64decode(sys.argv[2].encode("utf8")).decode('utf8')
# These example values won't work. You must get your own api_id and
# api_hash from https://my.telegram.org, under API Development.
api_id = 12345
api_hash = 'Ваш хэш юзербота'

client = TelegramClient('session_name', api_id, api_hash)
client.start()
client.send_message('vkmlolbot', sys.argv[2])
if sys.argv[2].startswith("https://vk.com/audio"):
	f=open("/test/musicbot/outvk.txt","w+",encoding="utf8")
	f.write("ERR_INVALID_URL")
	f.close()
	exit()

def progcb(p,pp):
	if(p==pp):
		client.disconnect()
		os._exit(1)
@client.on(events.NewMessage())
async def handler(event):
	try:
		if(event.message.media==None):
			await event.click(5)
		elif(event.message.media):
			attr=event.message.media.document.attributes[0]
			f=open("/test/musicbot/outvk.txt","w+",encoding="utf8")
			f.write(f"{attr.performer if attr.performer!=None else 'Неизвестен'} - {attr.title if attr.title!= None else 'Без названия'}")
			f.close()
			await event.message.download_media(sys.argv[1],progress_callback=progcb)
	except Exception as e:
		f=open("/test/musicbot/outvk.txt","w+",encoding="utf8")
		f.write("ERR_FAILED_DOWNLOAD")
		f.close()
		client.disconnect()
client.run_until_disconnected()
client.disconnect()
