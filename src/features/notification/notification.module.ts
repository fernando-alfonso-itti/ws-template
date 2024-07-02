import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationGateway } from './events/notification.gateway';
import { NotificationService } from './services/notification.service';

@Module({
    controllers: [NotificationController],
    providers: [NotificationGateway, NotificationService],
    imports: [],
    exports: [],
})
export class NotificationModule {}
