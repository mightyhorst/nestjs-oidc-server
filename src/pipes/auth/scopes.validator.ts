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
import {AuthRequestRequiredParamters, ScopeEnum} from '../../models';


/**
 * @see 
 * @desc 
 * 
     @param {ScopeEnum} scope
        REQUIRED. OpenID Connect requests MUST contain the openid scope value. 
        If the openid scope value is not present, the behavior is entirely unspecified. 
        Other scope values MAY be present. 
        Scope values used that are not understood by an implementation SHOULD be ignored. 
        See Sections 5.4 and 11 for additional scope values defined by this specification.
 *
 * @export
 * @class ScopeValidator
 * @implements {PipeTransform}
 */
@Injectable()
export class ScopeValidator implements PipeTransform {

    async transform(scopes: string, metadata: ArgumentMetadata): Promise<ScopeEnum[]> {

        console.log('checking the scopes '); 
        if(!scopes || typeof(scopes) !== 'string'){
            throw new OidcBadRequestException(
                OidcErrorsEnum.invalid_request,
                AuthRequestRequiredParamters.scope
            );
        }
        else{

            scopes = scopes.replace('%20', ' ');
            const splitScopes = scopes.split(' ');

            var validScopes:ScopeEnum[] = [];

            if(splitScopes.find(scope => scope === ScopeEnum.openid)){
                splitScopes.forEach(scope => {
                    switch(scope){
                        case(ScopeEnum.openid):
                            validScopes.push(ScopeEnum.openid);
                            break;
                        case(ScopeEnum.profile):
                            validScopes.push(ScopeEnum.profile);
                            break;
                        case(ScopeEnum.email):
                            validScopes.push(ScopeEnum.email);
                            break;
                    }
                });

                if(validScopes.length > 0)
                    return validScopes; 
            }
            
            throw new OidcBadRequestException(
                OidcErrorsEnum.invalid_scope,
                AuthRequestRequiredParamters.scope
            );

        }
    }
}


