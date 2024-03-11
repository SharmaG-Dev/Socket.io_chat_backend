import { Server, Socket } from 'socket.io'
import { GetUserMessage, RegisterMessage } from '../func/message.func';



class SocketServices {
    private io: Server
    private users: { [key: string]: string };

    constructor(io: Server) {
        this.io = io
        this.users = {}

        this.handleConnection()
    }

    private handleConnection() {
        this.io.on("connection", (socket: Socket) => {
            console.log("New connection joined", socket.id);

            socket.on("new-user", (data: string) => {
                this.handleNewUser(socket, data);
            });

            socket.on("message", async (data: string) => {
                await this.handleMessage(socket, data);
            });

            socket.on('send-message', async (data: string) => {
                await this.handleSendMessage(socket, data);
            });

            socket.on('disconnect', () => {
                this.handleDisconnect(socket);
            });
        });
    }

    private handleNewUser(socket: Socket, data: string) {
        this.users[socket.id] = data;
        this.emitUsers();
    }

    private async handleMessage(socket: Socket, data: string) {
        const { sender, reciver } = JSON.parse(data);
        const messagesData = await GetUserMessage({ reciverid: reciver, senderid: sender });
        this.emitMessage(socket, `${sender}-${reciver}`, messagesData);
        this.emitMessage(socket, `${reciver}-${sender}`, messagesData);
    }

    private async handleSendMessage(socket: Socket, data: string) {
        const { reciver, sender, message } = JSON.parse(data);
        await RegisterMessage({ message, sender, reciver });
        const messagesData = await GetUserMessage({ reciverid: reciver, senderid: sender });
        this.emitMessage(socket, `${sender}-${reciver}`, messagesData);
        this.emitMessage(socket, `${reciver}-${sender}`, messagesData);
    }

    private handleDisconnect(socket: Socket) {
        delete this.users[socket.id];
        this.emitUsers();
    }

    private emitUsers() {
        this.io.emit("users", this.users);
    }

    private emitMessage(socket: Socket, event: string, data: any) {
        socket.emit(`message:${event}`, data);
        socket.broadcast.emit(`message:${event}`, data);
    }
}



export default SocketServices