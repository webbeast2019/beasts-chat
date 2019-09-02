module.exports = (io) => {
  io.on('connection', function(socket){
    console.log('a user connected');
    let name = "";

    socket.on('username', (username)=> {
      socket.username = username;
      name = username;
      io.emit('is_online', '🔘 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', ()=>{
      console.log('user disconnected');
      io.emit('user-disconnect', name + ' has disconnected from the chat')
    });

    socket.on('chat-message', (msg)=>{
      io.emit('display_message', '🔘 <i>' + socket.username + ": " + msg + '</i>');
    })
  })};
