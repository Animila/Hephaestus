import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' && (!value || isNaN(value))) {
      throw new BadRequestException(`Invalid or missing parameter: ${metadata.data}`);
    }

    if (metadata.type === 'body' && !value) {
      throw new BadRequestException(`Missing required field: ${metadata.data}`);
    }

    return value;
  }
}