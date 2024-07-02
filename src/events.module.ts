import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { InMemorySessionStore } from '@/stores/session.store';

@Module({
    providers: [EventsGateway, InMemorySessionStore],
})
export class EventsModule {}
