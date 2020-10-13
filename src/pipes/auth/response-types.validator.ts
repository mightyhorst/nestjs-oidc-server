import { 
    PipeTransform, 
    Injectable, 
    ArgumentMetadata, 
} from '@nestjs/common';


/**
 * @requires Exceptions
 */
import { OidcException, OidcErrorsEnum, OidcBadRequestException } from '../../exceptions'; 

/**
 * @requires Models and Types
 */
import {AuthRequestRequiredParamters, ResponseTypeEnum} from '../../models';


/**
 * @see 
 * @desc 
 *      OAuth 2.0 Response Type value that determines the authorization processing flow to be used, 
        including what parameters are returned from the endpoints used. 
 * 
    @param {ResponseTypeEnum = '' | '' | '' | '' | ''} response_type
        REQUIRED.         
        When using the Authorization Code Flow, this value is code.

            | "response_type"       |   Flow                        |
            | ---                   |   ---                         |
            | code 	                |   Authorization Code Flow     |
            | id_token 	            |   Implicit Flow               |
            | id_token token 	    |   Implicit Flow               |
            | code id_token 	    |   Hybrid Flow                 |
            | code token 	        |   Hybrid Flow                 |
            | code id_token token   |   Hybrid Flow                 |

 * @export
 * @class ResponseTypeValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class ResponseTypeValidator implements PipeTransform {

    async transform(ResponseTypes: string, metadata: ArgumentMetadata): Promise<ResponseTypeEnum[]> {

        console.log('checking the ResponseTypes '); 
        if(!ResponseTypes || typeof(ResponseTypes) !== 'string'){
            throw new OidcBadRequestException(
                OidcErrorsEnum.invalid_request,
                AuthRequestRequiredParamters.response_type
            );
        }
        else{

            ResponseTypes = ResponseTypes.replace('%20', ' ');
            const splitResponseTypes = ResponseTypes.split(' ');

            var validResponseTypes:ResponseTypeEnum[] = [];

            const oidcError = new OidcBadRequestException(
                OidcErrorsEnum.unsupported_response_type,
                AuthRequestRequiredParamters.response_type
            );

            splitResponseTypes.forEach(ResponseType => {
                switch(ResponseType){
                    case(ResponseTypeEnum.code):
                        validResponseTypes.push(ResponseTypeEnum.code);
                        break;
                    case(ResponseTypeEnum.id_token):
                        validResponseTypes.push(ResponseTypeEnum.id_token);
                        break;
                    case(ResponseTypeEnum.token):
                        validResponseTypes.push(ResponseTypeEnum.token);
                        break;
                    default:
                        throw oidcError;
                }
            });

            if(validResponseTypes.length > 0)
                return validResponseTypes; 
            
            
            throw oidcError;

        }
    }
}


