import {
    UnauthorizedException, 
    BadRequestException, 
    HttpStatus
} from '@nestjs/common';
import {
    AuthRequestRequiredParamters, 
    TokenRequestRequiredParamters
} from '../models';

/**
 * @see 3.1.2.6.  Authentication Error Response
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
 * @param error 
 *      REQUIRED. 
 *      Error code.
 * @param error_description 
 *      OPTIONAL. 
 *      Human-readable ASCII encoded text description of the error.
 * @param error_uri 
 *      OPTIONAL. 
 *      URI of a web page that includes additional information about the error.
 * @param state 
 *      OAuth 2.0 state value. 
 *      REQUIRED 
 *      if the Authorization Request included the state parameter. Set to the value received from the Client.
 *
 * @see Auth endpoint 
 * @param redirect_uri - redirect uri from the client 
 * 
 * @export
 * @class OidcError
 * @extends {Error}
 */
export class OidcException extends Error{

    errorMsg: Oauth2AndOidcErrorsEnum;
    error_description: string;
    redirect_uri: string; 
    state?: string; 
    error_uri?: string; 

    constructor(
        errorMsg: Oauth2AndOidcErrorsEnum, 
        redirect_uri: string,
        state?: string, 
        error_uri?: string, 
    ){
        super(errorMsg);
        this.errorMsg = errorMsg; 
        this.error_description = this.getMsg(errorMsg); 
        this.redirect_uri = redirect_uri; 
        this.state = state; 
        this.error_uri = error_uri || '';
    }

    getRedirectUri(): string{

        /** 
         * @const deprecated
        
            let url = this.redirect_uri+'?'; 
            if(this.state) url += `state=${this.state}&`;
            url += `error=${this.errorMsg}&`; 
            url += `error_description=${this.error_description}`; 
            
            console.log('🐸 error redirect url:', url);
    
            return encodeURI(url);
        */

        const redirectUri = new URL(this.redirect_uri);

        if(this.state) 
            redirectUri.searchParams.append('state', this.state);

        redirectUri.searchParams.append('error', this.errorMsg);
        redirectUri.searchParams.append('error_description', this.error_description);

        console.log('🐸 Error redirect uri:', {'redirectUri.href': redirectUri.href});

        return redirectUri.href; 
    }

    getMsg(errorMsg: Oauth2AndOidcErrorsEnum): string{
        switch(errorMsg){
            /**
             * @namespace OAuth2 
             * @see https://tools.ietf.org/html/rfc6749#section-4.1.2.1
             */
            case Oauth2AndOidcErrorsEnum.invalid_request:
                this.error_description = `The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.`
                break;
            case Oauth2AndOidcErrorsEnum.unauthorized_client: 
                this.error_description = `The client is not authorized to request an authorization code using this method.`;
                break; 
            case Oauth2AndOidcErrorsEnum.access_denied:
                this.error_description = `The resource owner or authorization server denied the request.`;
                break; 
            case Oauth2AndOidcErrorsEnum.unsupported_response_type:
                this.error_description = `The authorization server does not support obtaining an authorization code using this method.`;
                break;
            case Oauth2AndOidcErrorsEnum.invalid_scope:
                this.error_description = `The requested scope is invalid, unknown, or malformed.`;
                break;
            case Oauth2AndOidcErrorsEnum.server_error:
                this.error_description = `The authorization server encountered an unexpected condition that prevented it from fulfilling the request. (This error code is needed because a 500 Internal Server Error HTTP status code cannot be returned to the client via an HTTP redirect)`; 
                break; 
            case Oauth2AndOidcErrorsEnum.temporarily_unavailable:
                this.error_description = `The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.  (This error code is needed because a 503 Service Unavailable HTTP status code cannot be returned to the client via an HTTP redirect)`; 
                break;

            /**
             * @namespace OAuth2 
             * @see https://tools.ietf.org/html/rfc6749#section-5.2 
             * @desc this was mssing from the section-4.1.2.1 
             */
            case Oauth2AndOidcErrorsEnum.invalid_client:
                this.error_description = `Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method).  The authorization server MAY return an HTTP 401 (Unauthorized) status code to indicate which HTTP authentication schemes are supported.  If the client attempted to authenticate via the "Authorization" request header field, the authorization server MUST respond with an HTTP 401 (Unauthorized) status code and include the "WWW-Authenticate" response header field matching the authentication scheme used by the client.`;
                break; 
            case Oauth2AndOidcErrorsEnum.invalid_grant:
                this.error_description = `The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.`;
                break; 
            case Oauth2AndOidcErrorsEnum.unsupported_grant_type:
                this.error_description = `The authorization grant type is not supported by the authorization server.`;
                break; 

            /**
             * @namespace OIDC 
             */
            case Oauth2AndOidcErrorsEnum.interaction_required:
                this.error_description = `The Authorization Server requires End-User interaction of some form to proceed. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User interaction.`;
                break;
            case Oauth2AndOidcErrorsEnum.login_required:
                this.error_description = `The Authorization Server requires End-User authentication. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User authentication.`;
                break;
            case Oauth2AndOidcErrorsEnum.account_selection_required:
                this.error_description = `The End-User is REQUIRED to select a session at the Authorization Server. The End-User MAY be authenticated at the Authorization Server with different associated accounts, but the End-User did not select a session. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface to prompt for a session to use.`;
                break;
            case Oauth2AndOidcErrorsEnum.consent_required:
                this.error_description = `The Authorization Server requires End-User consent. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User consent. invalid_request_uri. The request_uri in the Authorization Request returns an error or contains invalid data.`;
                break;
            case Oauth2AndOidcErrorsEnum.invalid_request_object:
                this.error_description = `The request parameter contains an invalid Request Object. request_not_supported. The OP does not support use of the request parameter defined in Section 6.`;
                break;
            case Oauth2AndOidcErrorsEnum.request_uri_not_supported:
                this.error_description = `The OP does not support use of the request_uri parameter defined in Section 6. registration_not_supported The OP does not support use of the registration parameter defined in Section 7.2.1.`;
                break;
        }
        return this.error_description;
    }
}
/** 
@namespace OAuth 
@see https://tools.ietf.org/html/rfc6749#section-4.1.2.1
    @param invalid_request
        The request is missing a required parameter, includes an
        invalid parameter value, includes a parameter more than
        once, or is otherwise malformed.

    @param unauthorized_client
        The client is not authorized to request an authorization
        code using this method.

    @param access_denied
        The resource owner or authorization server denied the
        request.

    @param unsupported_response_type
        The authorization server does not support obtaining an
        authorization code using this method.

    @param invalid_scope
        The requested scope is invalid, unknown, or malformed.

    @param server_error
        The authorization server encountered an unexpected
        condition that prevented it from fulfilling the request.
        (This error code is needed because a 500 Internal Server
        Error HTTP status code cannot be returned to the client
        via an HTTP redirect.)

    @param temporarily_unavailable
        The authorization server is currently unable to handle
        the request due to a temporary overloading or maintenance
        of the server.  (This error code is needed because a 503
        Service Unavailable HTTP status code cannot be returned
        to the client via an HTTP redirect.)
*/
export enum Oauth2AndOidcErrorsEnum{
    invalid_request = 'invalid_request',
    unauthorized_client = 'unauthorized_client',
    access_denied = 'access_denied',
    unsupported_response_type = 'unsupported_response_type',
    invalid_scope = 'invalid_scope',
    server_error = 'server_error',
    temporarily_unavailable = 'temporarily_unavailable',

    /**
    @namespace OAuth2 
    @see 5.2. Error Response
    @see https://tools.ietf.org/html/rfc6749#section-5.2 
        
        @param invalid_request - see above 

        @param invalid_client 
            Client authentication failed (e.g., unknown client, no
               client authentication included, or unsupported
               authentication method).  The authorization server MAY
               return an HTTP 401 (Unauthorized) status code to indicate
               which HTTP authentication schemes are supported.  If the
               client attempted to authenticate via the "Authorization"
               request header field, the authorization server MUST
               respond with an HTTP 401 (Unauthorized) status code and
               include the "WWW-Authenticate" response header field
               matching the authentication scheme used by the client.

        @param invalid_grant
            The provided authorization grant (e.g., authorization
               code, resource owner credentials) or refresh token is
               invalid, expired, revoked, does not match the redirection
               URI used in the authorization request, or was issued to
               another client.

        @param unauthorized_client - see above 

        @param unsupported_grant_type 
            The authorization grant type is not supported by the
               authorization server.

        @param invalid_scope - see above 
    */
   invalid_client = 'invalid_client',
   invalid_grant = 'invalid_grant',
   unsupported_grant_type = 'unsupported_grant_type', 

    /**
    @namespace OIDC 
    @see https://openid.net/specs/openid-connect-core-1_0.html#AuthError
        @param interaction_required
            The Authorization Server requires End-User interaction of some form to proceed. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User interaction.
        @param login_required
            The Authorization Server requires End-User authentication. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User authentication.
            account_selection_required
            The End-User is REQUIRED to select a session at the Authorization Server. The End-User MAY be authenticated at the Authorization Server with different associated accounts, but the End-User did not select a session. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface to prompt for a session to use.
        @param consent_required
            The Authorization Server requires End-User consent. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User consent.
            invalid_request_uri
            The request_uri in the Authorization Request returns an error or contains invalid data.
        @param invalid_request_object
            The request parameter contains an invalid Request Object.
            request_not_supported
            The OP does not support use of the request parameter defined in Section 6.
        @param request_uri_not_supported
            The OP does not support use of the request_uri parameter defined in Section 6.
            registration_not_supported
            The OP does not support use of the registration parameter defined in Section 7.2.1.
    */

    interaction_required = 'interaction_required',
    login_required = 'login_required',
    account_selection_required = 'account_selection_required',
    consent_required = 'consent_required',
    invalid_request_object = 'invalid_request_object',
    request_uri_not_supported = 'request_uri_not_supported',
}



export class OidcBadRequestException extends BadRequestException {
    constructor(oidcError: Oauth2AndOidcErrorsEnum, reqParam: AuthRequestRequiredParamters|TokenRequestRequiredParamters){
        const response = {
            errorTitle: 'Authorization Error',
            errorMsg: 'Error 400: '+oidcError,
            errorDescription: 'Required parameter is missing: '+reqParam,
        }
        super(response);
    }
}
