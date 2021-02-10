module.exports = (message, status = 400) => (JSON.stringify({ message, status }));
