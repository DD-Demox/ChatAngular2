const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 4500;

io.on('connection', (socket) => {
  console.log('Usuario se conectou');
  
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('usuario se desconectou');
  });
});

httpServer.listen(port, () => console.log(`Server na porta ${port}`));