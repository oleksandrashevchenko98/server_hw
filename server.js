const http = require('http');
const host = 'localhost';
const port = 8000;

const server = http.createServer((_req, res) => {
    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    setTimeout(() => {
        const isError = Math.random() < 0.1;
        if (isError) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error 500');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello world!');
        }
    }, delay);
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
