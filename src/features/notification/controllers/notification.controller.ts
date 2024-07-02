import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendNotificationDto } from '../core/dto/send-notification.dto';
import { NotificationService } from '../services/notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('/send')
    async send(
        @Body(new ValidationPipe()) sendNotificationDto: SendNotificationDto,
    ) {
        await this.notificationService.sendNotification(sendNotificationDto);
        return {
            message: 'Notification sent successfully',
        };
    }
}
