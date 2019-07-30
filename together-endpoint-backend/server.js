const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

function connect() {
  server.listen(PORT, () => {
    console.log(`Socket io is now live on port ${PORT}`);
  });
}

io.on('connection', function (socket) {
  // socket.on('join-posts', function (data) {
  //     socket.join(data.room);
  //     socket.broadcast.to(data.room).emit('new user joined');
  // });

  socket.on('create post', function (data) {
    io.emit('post created', {
      message: data
    });
  });
  socket.on('create-comment', function (data) {
    io.emit('new comment', {
      message: data
    });
  });
  socket.on('create-sub-comment', function (data) {
    io.emit('sub comment created', {
      message: data
    });
  });
});

module.exports = {
  connect,
}