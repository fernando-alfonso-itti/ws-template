import { Module } from '@nestjs/common';
import { NotificationModule } from './modules/notification.module';
import { EventsModule } from './events.module';

@Module({
    imports: [EventsModule, NotificationModule],
})
export class AppModule {}
