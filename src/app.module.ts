import { FileConsumer } from './messages/file.consumer.service';
import { FileProducerService } from './messages/file.producer.service';
import { MessageConsumer } from './messages/message.consumer';
import { MessageProducerService } from './messages/message.producer.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 3003,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'message-queue',
      },
      {
        name: 'file-operation-queue',
      },
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MessageProducerService,
    MessageConsumer,
    FileProducerService,
    FileConsumer,
  ],
})
export class AppModule {}
