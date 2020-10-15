import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

/**
 * @requires Exceptions - custom OIDC exceptions  
 */
import { OidcException, OidcBadRequestException } from '../exceptions'; 

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse();
        // const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        /**
        * @step Redirect
        * @desc Redirect - redirect back to the client with error payload as response_mode
        * @author Mitchy 
        */
        if(exception instanceof OidcException){
            response.redirect(exception.getRedirectUri());
            /** response.redirect(301, exception.getRedirectUri()); */
        }
        
        /**
        * @step Request Error 
        * @desc Request Error - the client hasn't provided compliant paramaters in the oauth requests 
        * @author Mitchy 
        */
        else if(exception instanceof OidcBadRequestException){
            switch(request.method){
                case 'POST':
                    response
                        .status(status)
                        .json(exception.getResponse());
                    break;
                default:
                    response.render('error', exception.getResponse()); 
                    break; 
            }
        }
        else{
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    exception: (exception as Error).message,
                    stack: (exception as Error).stack,
                });
        }
    }
}