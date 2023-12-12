const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 4500;
var clients = []

io.on('connection', (socket) => {
  console.log('Usuario se conectou');
  
  socket.on('salvarId',(id)=>{
    infoClient= new Object();
    infoClient.customId = id
    infoClient.clientId = socket.id
    clients.push(infoClient)
    console.log(clients)
  })
  socket.on('message', (message) => {
    console.log(message);
    var destino
    for( var i=0, len=clients.length; i<len; ++i ){

      if(clients[i].customId == message.to){
          destino = clients[i].clientId
          break;
      }
    }
    io.to(socket.id).to(destino).emit('message', message)
    
  });

  socket.on('disconnect', () => {
    console.log('usuario se desconectou');
    for( var i=0, len=clients.length; i<len; ++i ){
      var c = clients[i];

      if(c.clientId == socket.id){
          clients.splice(i,1);
          break;
      }
    }
    console.log(clients)

  });
});

httpServer.listen(port, () => console.log(`Server na porta ${port}`));