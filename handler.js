const fs = require('fs');
const { getCommand } = require('./lib/utils');
const config = require('./config');

const plugins = new Map();
const files = fs.readdirSync('./plugins').filter(f => f.endsWith('.js'));
for (const file of files) {
    const plugin = require(`./plugins/${file}`);
    plugins.set(plugin.command, plugin);
}

async function handleMessage(sock, msg) {
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    const cmd = getCommand(text, config.prefix);
    if (!cmd) return;

    const plugin = plugins.get(cmd.name);
    if (plugin) {
        await plugin.handler(sock, msg, cmd.args);
    }
}

module.exports = { handleMessage };
