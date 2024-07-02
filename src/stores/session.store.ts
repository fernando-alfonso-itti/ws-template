import { Injectable } from '@nestjs/common';

export type SocketSession = {
    userID: string;
    username: string;
    connected: boolean;
};

@Injectable()
export class InMemorySessionStore {
    private sessions: Map<string, SocketSession>;

    constructor() {
        this.sessions = new Map<string, SocketSession>();
    }

    findSession(id: string) {
        return this.sessions.get(id);
    }

    saveSession(id: string, session: SocketSession) {
        this.sessions.set(id, session);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}
