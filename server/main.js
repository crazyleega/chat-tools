import { WebApp } from 'meteor/webapp';
import http from 'http';
import socket_io from 'socket.io';

const PORT = 8080;
userList = [];


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


    //监听新用户的进入
    socket.on('new user', function(username){
      if(userList.indexOf(username) == -1){
        userList.push(username);
      }
      socket.name = username;
      socket.broadcast.emit('system message',username + '进入网站。',userList);
    });

    socket.on('new message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('notify',msg);
    });


    socket.on('disconnect', function() {
      console.log('is in server disconnect',socket.name);
      socket.broadcast.emit('system message',socket.name + '离开网站。',userList);
    })
  });

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }
});

Meteor.methods({
  getAllUser(){
    console.log(userList);
    return userList;
  }
});

