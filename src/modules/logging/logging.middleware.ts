import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: any, res: any, next: () => void): void {
    const { method, url, query, body } = req;
    this.loggingService.info(
      `Incoming Request: Method=${method}, URL=${url}, Query=${JSON.stringify(query)}, Body=${JSON.stringify(body)}`,
    );

    next();
  }
}
