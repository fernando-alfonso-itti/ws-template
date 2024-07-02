import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SendNotificationDto } from '../core/dto/send-notification.dto';
import { ConfirmNotificationDto } from '../core/dto/confirm-notification.dto';

@Injectable()
export class NotificationService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
    }

    async sendNotification(data: SendNotificationDto) {
        console.log({
            rooms: this.server.sockets.adapter.rooms.get(data.userId),
        });
        const sended = this.server
            .to(data.userId)
            .emit('newNotification', data);
        if (!sended) {
            throw new Error('Notification not sended');
        }
        // Hacer algo con la notificación enviada
        return sended;
    }

    confirmNotification(data: ConfirmNotificationDto) {
        // Hacer algo con la notificación confirmada
        console.log('Notification confirmed:', data);
    }
}
