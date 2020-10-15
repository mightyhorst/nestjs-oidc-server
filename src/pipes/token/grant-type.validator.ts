import { 
    PipeTransform, 
    Injectable, 
    ArgumentMetadata,  
} from '@nestjs/common';


/**
 * @requires Exceptions
 */
import { 
    OidcException, 
    Oauth2AndOidcErrorsEnum, 
    OidcBadRequestException 
} from '../../exceptions'; 

/**
 * @requires Models and Types
 */
import {
    // AuthRequestRequiredParamters, 
    TokenRequestRequiredParamters
} from '../../models';


/**
 * @see 
 * @desc 
 * 
    @param {Url} grant_type
        REQUIRED. 
        
 *
 * @export
 * @class GrantTypeValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class GrantTypeValidator implements PipeTransform {

    async transform(grant_type: any, metadata: ArgumentMetadata) {

        console.log('👉 checking the grant_type', {grant_type}); 
        if(!grant_type){
            throw new OidcBadRequestException(
                Oauth2AndOidcErrorsEnum.unsupported_grant_type,
                TokenRequestRequiredParamters.grant_type
            );
        }
        else{
            return grant_type; 
        }
    }
}


