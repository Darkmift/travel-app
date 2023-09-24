import { Logger } from '@nestjs/common';
import { AbstractLogger, LogLevel, LogMessage /*QueryRunner*/ } from 'typeorm';

export default class TypeOrmCustomLogger extends AbstractLogger {
  constructor(private logger: Logger) {
    super();
  }
  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    // queryRunner?: QueryRunner,
  ) {
    console.log('Custom logger is being called', level, logMessage);

    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });

    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          this.logger.log(message.message);
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            this.logger.log(message.prefix, message.message);
          } else {
            this.logger.log(message.message);
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            this.logger.warn(message.prefix, message.message);
          } else {
            this.logger.warn(message.message);
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            this.logger.error(message.prefix, message.message);
          } else {
            this.logger.error(message.message);
          }
          break;
      }
    }
  }
}
