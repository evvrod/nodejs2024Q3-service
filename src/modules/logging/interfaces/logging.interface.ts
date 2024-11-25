export interface ILogging {
  log(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string, trace?: string): void;
  debug(message: string): void;
}
