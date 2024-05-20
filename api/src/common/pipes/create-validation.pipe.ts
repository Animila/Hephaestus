import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CreateValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'password', 'roleId'];
    const missingFields = requiredFields.filter(field => !value[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(`Не хватает полей: ${missingFields.join(', ')}`);
    }

    return value;
  }
}
