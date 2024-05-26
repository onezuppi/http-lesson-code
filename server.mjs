import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let images = [];
const maxImages = 10;
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });

    if (images.length > 0) {
        console.log('Sending initial images to new client');
        ws.send(JSON.stringify({ type: 'initialImages', images: images }));
    }

    ws.on('message', (message) => {
        console.log('Received message:', message);
        const data = JSON.parse(message);

        if (data.type === 'newImage' && data.image) {
            console.log('New image received');
            if (images.length >= maxImages) {
                images.shift(); // Удаляем самое старое изображение, если достигли лимита
                console.log('Removed oldest image to maintain max limit');
            }
            images.unshift(data.image);
            console.log('Added new image, total images:', images.length);

            broadcast(JSON.stringify({ type: 'newImage', image: data.image }));
        }
    });
});

function broadcast(data) {
    console.log('Broadcasting message to all clients');
    for (let client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    }
}

console.log('WebSocket server is running on ws://localhost:8080');
