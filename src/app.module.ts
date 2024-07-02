import { Module } from '@nestjs/common';
import { NotificationModule } from './features/notification/notification.module';
import { EventsModule } from './events.module';

@Module({
    imports: [EventsModule, NotificationModule],
})
export class AppModule {}
