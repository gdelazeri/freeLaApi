/* Dependencies */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/* Routes */
const clientRoutes = require('./routes/client');
const professionalRoutes = require('./routes/professional');
const loginRoutes = require('./routes/login');
const projectRoutes = require('./routes/project');

/* Express initialization */
const app = express();

/* Express utilites */
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get('/status', (req, res) => {
  res.send('API Online');
});

/* Routes */
app.use('/client', clientRoutes);
app.use('/professional', professionalRoutes);
app.use('/login', loginRoutes);
app.use('/project', projectRoutes);

/**
 * CHAT
 */
const server = require('http').createServer()
const io = require('socket.io')(server)

const users = [];
const chatrooms = [];

io.on('connection', function (client) {
  // client.on('createChat', handleNewChat)

  // client.on('join', handleJoin)

  // client.on('leave', handleLeave)

  client.on('message', function(e) {
    
    client.to('freela2').emit('big-announcement', e.message); 
  })

  client.on('newChat', function(userTo) {
    const user = users.find(u => u.socketId === client.id);
    const userTo = users.find(u => u.email === to);
    if (user && userTo) {
      
      
    }
  })

  // client.on('availableUsers', handleGetAvailableUsers)

  client.on('register', function (email) {
    users.push({ socketId: client.id, email });
    console.log(io.sockets.connected[client.id].id);
    client.join('freela2');
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    users.delete(client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    users.delete(client.id)
    console.log(err)
  })
})

/**
 * CHAT
 */

server.listen(8000, function (err) {
  if (err) throw err
  console.log('listening on port 8000')
})

/* Startup */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API started on port ${port}`);
});
