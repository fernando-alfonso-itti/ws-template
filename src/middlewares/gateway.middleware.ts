import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InMemorySessionStore } from '../stores/session.store';

@Injectable()
export class WsAuthMiddleware {
    constructor(private sessionStore: InMemorySessionStore) {}
    use(socket: Socket, next: (err?: any) => void) {
        console.log('Middleware');
        console.log(socket.handshake.auth);
        const sessionID = socket.handshake.auth.sessionID;
        if (sessionID) {
            const session = this.sessionStore.findSession(sessionID);
            if (session) {
                socket.data.sessionID = sessionID;
                socket.data.userID = session.userID;
                socket.data.username = session.username;
                return next();
            }
        }

        const username = socket.handshake.auth.username;
        const userID = socket.handshake.auth.userID;
        if (!username || !userID) {
            return next(new WsException('Username and userID are required'));
        }

        try {
            socket.data.username = username;
            socket.data.userID = userID;
            socket.data.sessionID = sessionID ?? crypto.randomUUID();
            next();
        } catch (err) {
            next(new WsException('Unauthorized'));
        }
    }
}
