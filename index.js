const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');  // Cambiar por qrcode para generar imagen
const fs = require('fs');
const { handleMessage } = require('./handler');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,  // Deshabilitar QR en terminal
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        await handleMessage(sock, msg);
    });

    // Generar y guardar QR como imagen
    sock.ev.on('connection.update', (update) => {
        const { qr } = update;
        if (qr) {
            qrcode.toFile('./qr.png', qr, (err) => {
                if (err) {
                    console.error('Error generando el QR:', err);
                } else {
                    console.log('QR generado como qr.png');
                }
            });
        }
    });
}

startBot();

