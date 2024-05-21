import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper, AmqpConnectionManager } from 'amqp-connection-manager';
import { Channel, ConsumeMessage } from 'amqplib';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GetRabbitMQService implements OnModuleInit {
  private readonly logger = new Logger(GetRabbitMQService.name);
  private connection: AmqpConnectionManager;
  private channelWrapper: ChannelWrapper;

  constructor() {
    this.connection = amqp.connect([process.env.RABBITMQ_URI]);
    this.channelWrapper = this.connection.createChannel({
      setup: async (channel: Channel) => {
        await channel.assertQueue('sendEmail');
        channel.consume('sendEmail', this.handleSendEmail.bind(this), { noAck: false });
      },
    });

    this.channelWrapper.on('connect', () => this.logger.log('Connected to RabbitMQ'));
    this.channelWrapper.on('error', (err, { name }) => this.logger.error(`Channel ${name} error: ${err.message}`));
  }

  async onModuleInit() {
    this.logger.log('RabbitMQService initialized');
  }

  private async handleSendEmail(msg: ConsumeMessage | null) {
    if (!msg) {
      return;
    }

    const data = JSON.parse(msg.content.toString());

    console.log('Received message to send email to', data.email, 'with token', data.token);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${data.token}`,
    };

    try {
      const result = await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject(error);
          } else {
            console.info('Email sent:', info.response);
            this.channelWrapper.ack(msg);
            resolve(true);
          }
        });
      });

      console.log('Email sent successfully:', result);

    } catch (error) {
      this.logger.error('Error processing sendEmail message:', error.message);
      this.channelWrapper.nack(msg); // Сообщение останется в очереди для повторной обработки
    }
  }
}
