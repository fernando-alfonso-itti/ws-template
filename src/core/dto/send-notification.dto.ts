import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
    @ApiProperty({ description: 'Message to send' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ description: 'User ID to send notification' })
    @IsString()
    @IsNotEmpty()
    userId: string;
}
