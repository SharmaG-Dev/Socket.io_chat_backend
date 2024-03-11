import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectTodb } from './helper/config/connections';
import SocketServices from './helper/services/websockets';
import ApiRoutes from './helper/routes/app'

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: {} });
connectTodb()
const port: number = parseInt(process.env.PORT || "5000", 10);

app.use(express.json());
app.use(cors());

// send to socket server
new SocketServices(io)

app.use("/api", ApiRoutes)



app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the chatting server");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

