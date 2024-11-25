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
  private readonly logDirectory = join(__dirname, '..', '..', 'logs');
  private readonly logFilePath = join(this.logDirectory, 'application.log');
  private readonly errorLogFilePath = join(this.logDirectory, 'errors.log');

  private readonly logLevel = process.env.LOG_LEVEL || 'info';
  private readonly maxFileSize = parseInt(
    process.env.LOG_FILE_SIZE || '1024',
    10,
  );

  private readonly levels = ['debug', 'info', 'warn', 'error'];

  constructor() {
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    if (!existsSync(this.logDirectory)) {
      mkdirSync(this.logDirectory);
    }
  }

  private checkFileRotation(filePath: string): void {
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      if (stats.size > this.maxFileSize * 1024) {
        const rotatedFilePath = `${filePath}.${Date.now()}`;
        renameSync(filePath, rotatedFilePath);
      }
    }
  }

  private writeToFile(filePath: string, message: string): void {
    this.checkFileRotation(filePath);
    appendFileSync(filePath, `${message}\n`);
  }

  private logMessage(level: string, message: string, trace?: string): void {
    if (this.levels.indexOf(level) >= this.levels.indexOf(this.logLevel)) {
      const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
      if (trace) {
        console.error(logEntry);
      } else {
        console.log(logEntry);
      }

      this.writeToFile(
        this.logFilePath,
        trace ? `${logEntry}\nTrace: ${trace}` : logEntry,
      );

      if (level === 'error') {
        this.writeToFile(
          this.errorLogFilePath,
          trace ? `${logEntry}\nTrace: ${trace}` : logEntry,
        );
      }
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
