import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmNotificationDto {
    @ApiProperty({ description: 'Notification ID to confirm' })
    @IsString()
    @IsNotEmpty()
    notificationId: string;

    @ApiProperty({ description: 'User ID to confirm notification' })
    @IsString()
    @IsNotEmpty()
    userId: string;
}
