import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;

        this.loggingService.info(
          `Response: ${method} ${url} - StatusCode: ${statusCode} - Time: ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
