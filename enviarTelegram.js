// sendMessage.js
const fetch = require('node-fetch');

// Obtener el token del bot y el ID del chat desde los argumentos del terminal
const BOT_TOKEN = 'TU_BOT_TOKEN_AQUI';
const CHAT_ID = 'TU_CHAT_ID_AQUI';
const MESSAGE = process.argv[2]; // El mensaje se recibe como argumento

if (!MESSAGE) {
    console.error('Por favor, proporciona un mensaje como argumento.');
    process.exit(1);
}

// Función para enviar el mensaje
const sendMessage = async (chatId, message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    });

    const data = await response.json();

    if (data.ok) {
        console.log(`Mensaje enviado: ${data.result.text}`);
    } else {
        console.error(`Error al enviar mensaje: ${data.description}`);
    }
};

// Llamar a la función para enviar el mensaje
sendMessage(CHAT_ID, MESSAGE);