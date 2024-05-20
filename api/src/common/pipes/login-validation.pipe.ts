import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter(field => !value[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(`Не хватает полей: ${missingFields.join(', ')}`);
    }

    return value;
  }
}