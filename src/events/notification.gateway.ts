import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from '../services/notification.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
    perMessageDeflate: false,
})
export class NotificationGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly notificationsService: NotificationService) {}

    afterInit() {
        this.notificationsService.setServer(this.server);
    }

    @SubscribeMessage('sendNotification')
    handleSendNotification(
        @MessageBody() data: { message: string; userId: string },
    ): void {
        this.notificationsService.sendNotification(data);
    }

    @SubscribeMessage('confirmNotification')
    handleConfirmNotification(
        @MessageBody() data: { notificationId: string; userId: string },
    ): void {
        this.notificationsService.confirmNotification(data);
    }
}
