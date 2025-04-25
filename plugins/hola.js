module.exports = {
    command: 'hola',
    description: 'Saluda al usuario',
    handler: async (sock, msg, args) => {
        const { remoteJid } = msg.key;
        await sock.sendMessage(remoteJid, { text: '¡Hola! Soy GOKU-BOT 👋' });
    }
};