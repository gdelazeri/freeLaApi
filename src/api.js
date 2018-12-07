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

const users = new Map();
// let chatHistory = []

// function broadcastMessage(message) {
//   users.forEach(m => m.emit('message', message))
// }

// function addEntry(entry) {
//   chatHistory = chatHistory.concat(entry)
// }

// function getChatHistory() {
//   return chatHistory.slice()
// }

// function addUser(clientId, email) {
//   users.push({clientId, email})
// }

// function removeUser(client) {
//   users.push({clientId, email})
// }

// // function serialize() {
//   return {
//     name,
//     image,
//     numusers: users.size
//   }
// }

function handleChat(userName, callback) {
  console.log(userName, callback)
  if (!clientManager.isUserAvailable(userName))
    return callback('user is not available')

  const user = clientManager.getUserByName(userName)
  clientManager.registerClient(client, user)

  return callback(null, user)
}

// function handleEvent(chatroomName, createEntry) {
//   return ensureValidChatroomAndUserSelected(chatroomName)
//     .then(function ({ chatroom, user }) {
//       // append event to chat history
//       const entry = { user, ...createEntry() }
//       chatroom.addEntry(entry)

//       // notify other clients in chatroom
//       chatroom.broadcastMessage({ chat: chatroomName, ...entry })
//       return chatroom
//     })
// }

function handleJoin(chatroomName, callback) {
  const createEntry = () => ({ event: `joined ${chatroomName}` })

  handleEvent(chatroomName, createEntry)
    .then(function (chatroom) {
      // add member to chatroom
      chatroom.addUser(client)

      // send chat history to client
      callback(null, chatroom.getChatHistory())
    })
    .catch(callback)
}

function handleDisconnect() {
  // remove user profile
  clientManager.removeClient(client)
  // remove member from all chatrooms
  chatroomManager.removeClient(client)
}

function handleMessage(e) {
  console.log(e);
}

io.on('connection', function (client) {
  // client.on('createChat', handleNewChat)

  // client.on('join', handleJoin)

  // client.on('leave', handleLeave)

  client.on('message', function(msg) { 
    users.forEach((email, socketId) => {
      console.log(email, socketId);
      if (email.trim() === msg.to.trim()) {
        io.sockets.connected[socketId].emit('hello', msg.message);
      }
    });
  })

  client.on('register', function (email) {
    console.log('client registered...', client.id, email)
    users.set(client.id, email);
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
