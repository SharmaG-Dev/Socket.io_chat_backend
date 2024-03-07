import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectTodb } from './helper/config/connections';
import { GenerateUserName } from './helper/func/generateuserName';
import { GetUserMessage, RegisterMessage } from './helper/func/message.func';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: {} });
connectTodb()
const port: number = parseInt(process.env.PORT || "5000", 10);

app.use(express.json());
app.use(cors());

const users: any = {}
const chats: any = {}


io.on("connection", (socket) => {
    console.log("new connection join", socket.id)
    socket.on("new-user", (data) => {
        users[socket.id] = data
        socket.emit("users", users)
        socket.broadcast.emit("users", users)
    })

    socket.on("message", async (data) => {
        const { sender, reciver } = JSON.parse(data)
        const messagesData = await GetUserMessage({ reciverid: reciver, senderid: sender })
        socket.emit(`message:${sender}-${reciver}`, messagesData)
        socket.broadcast.emit(`message:${sender}-${reciver}`, messagesData)
        socket.broadcast.emit(`message:${reciver}-${sender}`, messagesData)
    })

    socket.on('send-message', async (data) => {
        const { reciver, sender, message } = JSON.parse(data)
        await RegisterMessage({ message, sender, reciver })
        const messagesData = await GetUserMessage({ reciverid: reciver, senderid: sender })
        socket.emit(`message:${sender}-${reciver}`, messagesData)
        socket.broadcast.emit(`message:${sender}-${reciver}`, messagesData)
        socket.broadcast.emit(`message:${reciver}-${sender}`, messagesData)
    })

    socket.on('disconnect', () => {
        delete users[socket.id]
        socket.emit("users", users)
        socket.broadcast.emit("users", users)
    })
})



app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the chatting server");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// io.on('connection', async (socket) => {
//     socket.on("new-user", (data) => {
//         if (!users.has(data)) {
//             users.add(data);
//             idBasedUser = { ...idBasedUser, [socket.id]: data }
//         }
//         socket.emit("users", Array.from(users));
//     });

//     socket.on("user-logout", (data) => {
//         if (users.has(data)) {
//             users.delete(data);
//             socket.emit("users", Array.from(users));
//         }
//     });
//     socket.on('disconnect', async () => {
//         console.log(users)
//         const data = idBasedUser[socket.id]
//         if (users.has(data)) {
//             users.delete(data)
//         }
//         socket.emit("users", Array.from(users))
//     });
// });