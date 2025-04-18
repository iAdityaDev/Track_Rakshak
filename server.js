// server.js - Simple WebSocket relay server for TrackRakshak
const WebSocket = require('ws');

// Create WebSocket server on port 8080 (or use environment variable)
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server started on port ${PORT}`);

// Track all connected clients
const clients = new Set();

// Handle new connections
wss.on('connection', (ws) => {
  // Add client to set
  clients.add(ws);
  console.log(`New client connected. Total clients: ${clients.size}`);
  
  // Handle messages from clients
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received message:', data);
      
      // Broadcast the message to all other clients
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
    console.log(`Client disconnected. Total clients: ${clients.size}`);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Connected to TrackRakshak WebSocket Server'
  }));
});

// Simple keep-alive to prevent server from sleeping (useful for platforms like Heroku)
setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'ping', timestamp: new Date().toISOString() }));
    }
  });
}, 30000);