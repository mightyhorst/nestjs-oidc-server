import { 
    PipeTransform, 
    Injectable, 
    ArgumentMetadata,  
} from '@nestjs/common';


/**
 * @requires Exceptions
 */
import { OidcException, Oauth2AndOidcErrorsEnum, OidcBadRequestException } from '../../exceptions'; 

/**
 * @requires Models and Types
 */
import {AuthRequestRequiredParamters} from '../../models';


/**
 * @see 
 * @desc 
 * 
    @param {Url} redirect_uri
        REQUIRED. 
        Redirection URI to which the response will be sent. 
        This URI MUST exactly match one of the Redirection URI values for the Client pre-registered at the OpenID Provider, with the matching performed as described in Section 6.2.1 of [RFC3986] (Simple String Comparison). 
        
        When using this flow, the Redirection URI SHOULD use the https scheme; 
        however, it MAY use the http scheme, provided that the Client Type is confidential, as defined in Section 2.1 of OAuth 2.0, 
        and provided the OP allows the use of http Redirection URIs in this case. 
        
        The Redirection URI MAY use an alternate scheme, such as one that is intended to identify a callback into a native application.
 *
 * @export
 * @class RedirectUriValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class RedirectUriValidator implements PipeTransform {

    async transform(redirectUri: any, metadata: ArgumentMetadata) {

        console.log('👉 checking the redirectUri ', {redirectUri}); 
        if(!redirectUri){
            throw new OidcBadRequestException(
                Oauth2AndOidcErrorsEnum.invalid_request,
                AuthRequestRequiredParamters.redirect_uri
            );
        }
        else{
            return redirectUri; 
        }
    }
}


