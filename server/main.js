import { WebApp } from 'meteor/webapp';
import http from 'http';
import socket_io from 'socket.io';

const PORT = 8080


//设置CORS
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

Meteor.startup(() => {
  // code to run on server at startup
  const server = http.createServer();
  const io = socket_io(server);

  io.on('connection', function(socket) {
    console.log('new socket client');
    socket.on('new message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('notify',msg);
    });
  });

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }
});


