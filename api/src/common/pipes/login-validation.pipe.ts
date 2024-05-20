// src/common/pipes/login-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
  transform(value: any) {
    const requiredFields = ['email'];
    const missingFields = requiredFields.filter(field => !value[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing fields: ${missingFields.join(', ')}`);
    }

    return value;
  }
}
