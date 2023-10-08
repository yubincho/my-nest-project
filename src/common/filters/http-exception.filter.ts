import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // const error = exception.getResponse() //  1.  controller 에서 만든 에러 메시지 받아서
        const error = exception.getResponse() as
            | string
            | { error: string; statusCode: number; message: string | string[] }

        if (typeof error === 'string') {
            response.status(status).json({
                success: false,
                timestamp: new Date().toISOString(),
                path: request.url,
                error,
            })
        } else {
            response.status(status).json({
                success: false,
                timestamp: new Date().toISOString(),
                ...error,
            })
        }

        /*
        response
            .status(status)
            .json({
                // statusCode: status,
                success: false,
                timestamp: new Date().toISOString(),
                path: request.url,
                error, // error: error  2. 에러메시지 출력
            });

         */
    }
}