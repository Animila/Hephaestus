import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit.service';
import { ProducerService } from './producer.service';
import { GetRabbitMQService } from './getrabbit.service';

@Module({
  providers: [RabbitMQService, ProducerService, GetRabbitMQService],
  exports: [RabbitMQService, ProducerService, GetRabbitMQService],
})
export class RabbitModule {}