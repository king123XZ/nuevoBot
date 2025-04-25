const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const { join } = require('path');

const { state, saveState } = useSingleFileAuthState(join(__dirname, 'auth_info.json'));

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (text === 'hola') {
            await sock.sendMessage(from, { text: '¡Hola! ¿Cómo estás? 🤖' });
        }

        if (text === 'adios') {
            await sock.sendMessage(from, { text: '¡Hasta luego!' });
        }
    });
}

startBot();
