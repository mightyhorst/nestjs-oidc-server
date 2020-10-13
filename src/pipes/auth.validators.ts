import { 
    PipeTransform, 
    Injectable, 
    ArgumentMetadata, 
    Inject 
} from '@nestjs/common';


/**
 * @requires Exceptions
 */
import { OidcException, OidcErrorsEnum, OidcBadRequestException } from '../exceptions'; 

/**
 * @requires Models and Types
 */
import {AuthRequestRequiredParamters} from '../models';


/**
 * @see 
 * @desc 
 * 
     @param client_id
         REQUIRED.  The client identifier as described in Section 2.2.
 *
 * @export
 * @class ClientIdValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class ClientIdValidator implements PipeTransform {

    async transform(clientId: any, metadata: ArgumentMetadata) {

        console.log('checking the clientId '); 
        if(!clientId){
            throw new OidcBadRequestException(
                OidcErrorsEnum.invalid_request,
                AuthRequestRequiredParamters.client_id
            );
        }
        else{
            return String(clientId); 


            await setTimeout(()=> {}, 2000)
            console.log('lookup complete');
            throw new OidcException(
                OidcErrorsEnum.unauthorized_client,
                'https://jwt.io',
            );
            return {
                isOk: false, 
                msg: 'client not found'
            }; 
        }

        return {
            isOk: true, 
            clientId
        };
    }
}