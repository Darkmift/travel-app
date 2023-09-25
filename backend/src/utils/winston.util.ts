import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

const logger = WinstonModule.createLogger({
  level: 'debug', // The minimum level of messages to log.
  transports: [
    new transports.File({
      filename: 'application.log', // The filename of the logfile to write to
      dirname: 'logs', // The directory to save log files
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export default logger;
