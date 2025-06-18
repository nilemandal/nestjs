import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
    log(message: any, context?: string) {
        const entry = `${context ? `[${context}] ` : ''}${message}`;
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string | Error) {
        super.error(message, stackOrContext);
    }
}
