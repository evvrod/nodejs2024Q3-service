import { Injectable } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  statSync,
  renameSync,
} from 'fs';
import { join } from 'path';
import { ILogging } from './interfaces/logging.interface';

@Injectable()
export class LoggingService implements ILogging {
  private readonly logFilePath = join(
    __dirname,
    '..',
    '..',
    'logs',
    'application.log',
  );
  private readonly logLevel = process.env.LOG_LEVEL || 'info';
  private readonly maxFileSize = parseInt(
    process.env.LOG_FILE_SIZE || '1024',
    10,
  );

  private readonly levels = ['debug', 'info', 'warn', 'error'];

  constructor() {
    this.ensureLogDirectory();
  }

  // Убедиться, что директория для логов существует
  private ensureLogDirectory(): void {
    const logDir = join(__dirname, '..', '..', '..', 'logs');
    if (!existsSync(logDir)) {
      mkdirSync(logDir);
    }
  }

  // Проверить и выполнить ротацию файла
  private checkFileRotation(): void {
    if (existsSync(this.logFilePath)) {
      const stats = statSync(this.logFilePath);
      if (stats.size > this.maxFileSize * 1024) {
        const rotatedFilePath = `${this.logFilePath}.${Date.now()}`;
        renameSync(this.logFilePath, rotatedFilePath);
      }
    }
  }

  // Записать сообщение в файл
  private writeToFile(message: string): void {
    this.checkFileRotation();
    appendFileSync(this.logFilePath, `${message}\n`);
  }

  // Общий метод для логирования
  private logMessage(level: string, message: string, trace?: string): void {
    if (this.levels.indexOf(level) >= this.levels.indexOf(this.logLevel)) {
      const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
      if (trace) {
        console.error(logEntry);
      } else {
        console.log(logEntry);
      }
      this.writeToFile(trace ? `${logEntry}\nTrace: ${trace}` : logEntry);
    }
  }

  log(message: string): void {
    this.logMessage('info', message);
  }

  info(message: string): void {
    this.logMessage('info', message);
  }

  warn(message: string): void {
    this.logMessage('warn', message);
  }

  error(message: string, trace?: string): void {
    this.logMessage('error', message, trace);
  }

  debug(message: string): void {
    this.logMessage('debug', message);
  }
}
