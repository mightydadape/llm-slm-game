const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

// Store votes for current question
let votes = {};

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API endpoints
app.get('/api/game-data', (req, res) => {
    const data = JSON.parse(fs.readFileSync('game_data.json', 'utf8'));
    res.json(data);
});

app.post('/api/vote', (req, res) => {
    const { voter, vote } = req.body;
    votes[voter] = vote;

    // Broadcast to all connected clients
    broadcast({
        type: 'vote',
        voter,
        vote
    });

    res.json({ success: true });
});

app.post('/api/reset-votes', (req, res) => {
    votes = {};

    // Broadcast reset to all clients
    broadcast({
        type: 'votes',
        votes: {}
    });

    res.json({ success: true });
});

// WebSocket handling
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send current votes to new client
    ws.send(JSON.stringify({
        type: 'votes',
        votes
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'vote') {
                votes[data.voter] = data.vote;

                // Broadcast to all clients
                broadcast({
                    type: 'vote',
                    voter: data.voter,
                    vote: data.vote
                });
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcast(data) {
    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Get local IP address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

server.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('\n🎮 LLM vs SLM Game Server Started!\n');
    console.log(`Host view: http://localhost:${PORT}`);
    console.log(`Host view (network): http://${localIP}:${PORT}`);
    console.log(`\nPlayer voting: http://${localIP}:${PORT}/vote.html`);
    console.log('\nPlayers can scan the QR code on the host screen to join!\n');
});
