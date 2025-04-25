function getCommand(text, prefix) {
    if (!text || !text.startsWith(prefix)) return null;
    const parts = text.slice(prefix.length).trim().split(/\s+/);
    return { name: parts[0], args: parts.slice(1) };
}

module.exports = { getCommand };
