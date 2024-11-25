import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from './logging.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    this.loggingService.error(
      `Unhandled Error: ${exception.message || exception.name} | Request: ${request.method} ${request.url} | Stack: ${exception.stack}`,
    );

    const status = exception.status || 500;
    const message = exception.response?.message || 'Internal Server Error';

    // Отправляем ответ с кодом 500 для непредвиденных ошибок
    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.message || 'Internal Server Error',
    });
  }
}
