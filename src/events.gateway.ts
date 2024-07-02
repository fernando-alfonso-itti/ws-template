import { WsAuthMiddleware } from '@/middlewares/gateway.middleware';
import { InMemorySessionStore, SocketSession } from '@/stores/session.store';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
})
export class EventsGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    @WebSocketServer()
    server: Server;

    constructor(private readonly sessionStore: InMemorySessionStore) {}

    afterInit(server: Server) {
        server.use((socket, next) =>
            new WsAuthMiddleware(this.sessionStore).use(socket, next),
        );
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        const sessionID = client.data.sessionID as string;
        const username = client.data.username as string;
        const userID = client.data.userID as string;
        this.sessionStore.saveSession(sessionID, {
            userID: userID,
            username: username,
            connected: true,
        });
        console.log(`User connected: ${username} (${userID})`);
        client.join(userID);
        const users: SocketSession[] = [];
        this.sessionStore.findAllSessions().forEach((session) => {
            users.push({
                userID: session.userID,
                username: session.username,
                connected: session.connected,
            });
        });

        this.server.emit('users', users);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        // Puedes agregar lógica adicional aquí
    }
}
