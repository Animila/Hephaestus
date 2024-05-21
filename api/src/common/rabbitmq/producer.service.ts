import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { RabbitMQService } from './rabbit.service';

@Injectable()
export class ProducerService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async addToEmailQueue(mail: { userId: number, email: string, token: string }) {
    try {
      await this.rabbitMQService.sendEmail(mail);
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new HttpException('Error adding mail to queue', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
