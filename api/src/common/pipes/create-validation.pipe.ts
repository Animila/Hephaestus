import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CreateValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = ['first_name', 'last_name', 'phone', 'email', 'role_id'];
    const missingFields = requiredFields.filter(field => !value[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(`Не хватает полей: ${missingFields.join(', ')}`);
    }

    return value;
  }
}
