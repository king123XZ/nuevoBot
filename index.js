const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { handleMessage } = require('./handler');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        await handleMessage(sock, msg);
    });
}

startBot();
