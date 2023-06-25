const express = require("express")
const app = express()
const PORT = 4000
const http = require("http").Server(app)
const cors = require("cors")
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "<http://172.20.10.2:3000>"
    }
})
const generateID = () => Math.random().toString(36).substring(2, 10)
let chatRooms = []

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("createRoom", (name, users) => {
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, users, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

    socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		console.log(chatRooms);
		socket.emit("foundRoom", result[0].messages);
		console.log("Messages Form", result[0].messages);
	});

    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('A user disconnected');
    })

    socket.on("newMessage", (data) => {
        const { room_id, message, user, timestamp } = data;
    
        let result = chatRooms.filter((room) => room.id == room_id);
    
        const newMessage = {
            id: generateID(),
            text: message,
            user,
            time: `${timestamp.hour}:${timestamp.mins}`,
        };

        socket.to(result[0].name).emit("roomMessage", newMessage);
        result[0].messages.push(newMessage);
    
        socket.emit("roomsList", chatRooms);
        socket.emit("foundRoom", result[0].messages);
    });
})

app.get("/api", (req, res) => {
    res.json(chatRooms);
})

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

