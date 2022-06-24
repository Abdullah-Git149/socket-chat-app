const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log(` User connected at ${socket.id}`)

    socket.on("join__room", (data) => {
        socket.join(data)
        console.log(`user with ${socket.id} joined the room ${data}`);
    })

    socket.on("send__message", (data) => {

        socket.to(data.room).emit("recieve__message", data)
    })
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})

server.listen(3001, () => {
    console.log("Server listening on port 3001");
})