import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CreateUserValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value: ${value.age}`);

    const parseAge = parseInt(value.age);

    if (isNaN(parseAge))
      throw new HttpException('age is not a number', HttpStatus.BAD_REQUEST);

    return { ...value, age: parseAge };
  }
}
