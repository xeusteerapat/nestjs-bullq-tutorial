import { MessageProducerService } from './messages/message.producer.service';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FileProducerService } from './messages/file.producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProducerService: MessageProducerService,
    private readonly fileProducerService: FileProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('invoke-message')
  getInvokeMessage(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);

    return {
      message: msg,
    };
  }

  @Get('delete-file')
  async deleteFile(@Query('file') file: string) {
    await this.fileProducerService.deleteFile(file);

    return {
      status: 'Deleted file success!',
    };
  }
}
