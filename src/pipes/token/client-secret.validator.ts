import { 
    PipeTransform, 
    Injectable, 
    ArgumentMetadata, 
    Inject 
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
    AuthRequestRequiredParamters,
    TokenRequestRequiredParamters,
} from '../../models';


/**
 * @see 
 * @desc 
 * 
     @param client_secret
         REQUIRED.  
         The client secret.  The client MAY omit the
         parameter if the client secret is an empty string.
 *
 * @export
 * @class ClientSecretValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class ClientSecretValidator implements PipeTransform {

    async transform(client_secret: any, metadata: ArgumentMetadata) {

        console.log('👉 checking the client_secret', {client_secret}); 
        if(!client_secret){
            throw new OidcBadRequestException(
                // Oauth2AndOidcErrorsEnum.unauthorized_client,
                Oauth2AndOidcErrorsEnum.invalid_client,
                TokenRequestRequiredParamters.client_secret, 
            );
        }
        else{
            return String(client_secret); 
        }
    }
}