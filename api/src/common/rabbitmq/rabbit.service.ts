import { Injectable, Logger } from '@nestjs/common';
import amqp, { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import * as process from 'process';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: AmqpConnectionManager;
  private channelWrapper: ChannelWrapper;
  private readonly sendEmailQueue = 'sendEmail';

  constructor() {
    this.connection = amqp.connect([process.env.RABBITMQ_URI]);
    this.channelWrapper = this.connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(this.sendEmailQueue, { durable: true });
      },
    });

    this.channelWrapper.on('connect', () => this.logger.log('Connected to RabbitMQ'));
    this.channelWrapper.on('error', (err, { name }) => this.logger.error(`Channel ${name} error: ${err.message}`));
  }

  async sendEmail(data: { userId: number, email: string, token: string }): Promise<void> {
    try {
      this.logger.log(`Sending email: ${JSON.stringify(data)}`);
      await this.channelWrapper.sendToQueue(this.sendEmailQueue, Buffer.from(JSON.stringify(data)));
      this.logger.log('Email message sent:', JSON.stringify(data));
    } catch (err) {
      this.logger.error(`RabbitMQ error: ${err.message}`);
      throw new Error(`RabbitMQ error: ${err.message}`);
    }
  }
}
