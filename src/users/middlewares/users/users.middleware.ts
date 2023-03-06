import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('this is a middleware');
    console.log(req.headers.authorization);

    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('not authorized', HttpStatus.FORBIDDEN);
    if (authorization === 'ksdhfkjdskj') next();
    else throw new HttpException('not valid authorized', HttpStatus.FORBIDDEN);
  }
}
