const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const axios = require('axios');

// Reemplaza con tu token real
const token = '';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, '¡Hola! 👋 ¿Te gustaría ver algunos proyectos de Freelancer.es?');
  } else if (text.toLowerCase() === 'sí') {
    try {
      const response = await axios.get('https://www.freelancer.es/jobs?languages=es');
      const $ = cheerio.load(response.data);
      const projects = $('.ProjectSearch-content');

      let projectList = '';
      projects.each((index, element) => {
        projectList += `\n**Proyecto ${index + 1}:**\n`;
        projectList += $(element).text().trim();
      });

      await bot.sendMessage(chatId, projectList);
    } catch (error) {
      console.error('Error fetching data:', error);
      await bot.sendMessage(chatId, 'Ups! Algo salió mal. Intenta de nuevo más tarde.');
    }
  }
});
