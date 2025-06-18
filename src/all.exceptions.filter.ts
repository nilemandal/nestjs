import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './config/logger/logger.service';
import { PrismaClientValidationError } from 'generated/prisma/runtime/library';

type ResponseObj = {
    statusCode: number;
    response: string | object;
    path: string
    timestamp: string;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new LoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: ResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        if( exception instanceof HttpException ) {
            myResponseObj.statusCode = exception.getStatus();
            myResponseObj.response = exception.getResponse();
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 422;
            myResponseObj.response = {
                message: 'Prisma Client Validation Error',
                error: exception.message,
            };
        }else{
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObj.response = {
                message: 'Internal Server Error',
                error: exception instanceof Error ? exception.message : 'Unknown error',
            };
        }

        response
            .status(myResponseObj.statusCode)
            .json(myResponseObj);

        this.logger.error(myResponseObj.response, AllExceptionsFilter.name);
        super.catch(exception, host);
    }
}
