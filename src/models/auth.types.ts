export enum AuthRequestRequiredParamters{
    response_type = 'response_type',
    client_id = 'client_id',
    scope = 'scope',
    
}

/**
* @namespace OAuth2.0 
* @description OAuth2.0 request parameters with the Authorization Code Flow:
    @param {ScopeEnum} scope
        REQUIRED. OpenID Connect requests MUST contain the openid scope value. If the openid scope value is not present, the behavior is entirely unspecified. Other scope values MAY be present. Scope values used that are not understood by an implementation SHOULD be ignored. See Sections 5.4 and 11 for additional scope values defined by this specification.

*/
export enum ScopeEnum{
    openid = 'openid',
    profile = 'profile',
    email = 'email',
}

/**
    @param {ResponseTypeEnum = '' | '' | '' | '' | ''} response_type
        REQUIRED. OAuth 2.0 Response Type value that determines the authorization processing flow to be used, including what parameters are returned from the endpoints used. When using the Authorization Code Flow, this value is code.

            | "response_type"       |   Flow                        |
            | ---                   |   ---                         |
            | code 	                |   Authorization Code Flow     |
            | id_token 	            |   Implicit Flow               |
            | id_token token 	    |   Implicit Flow               |
            | code id_token 	    |   Hybrid Flow                 |
            | code token 	        |   Hybrid Flow                 |
            | code id_token token   |   Hybrid Flow                 |
*/
export enum ResponseTypeEnum{
    code = 'code',
    id_token = 'id_token',
    token = 'token'
}

/**
    @param {string} client_id
        REQUIRED. OAuth 2.0 Client Identifier valid at the Authorization Server.
    @param {Url} redirect_uri
        REQUIRED. Redirection URI to which the response will be sent. This URI MUST exactly match one of the Redirection URI values for the Client pre-registered at the OpenID Provider, with the matching performed as described in Section 6.2.1 of [RFC3986] (Simple String Comparison). When using this flow, the Redirection URI SHOULD use the https scheme; however, it MAY use the http scheme, provided that the Client Type is confidential, as defined in Section 2.1 of OAuth 2.0, and provided the OP allows the use of http Redirection URIs in this case. The Redirection URI MAY use an alternate scheme, such as one that is intended to identify a callback into a native application.
    @param {string} state
        RECOMMENDED. Opaque value used to maintain state between the request and the callback. Typically, Cross-Site Request Forgery (CSRF, XSRF) mitigation is done by cryptographically binding the value of this parameter with a browser cookie.

* @namespace OAuth2.0 Multiple Response Type Encoding Practices 
    de Medeiros, B., Ed., Scurtescu, M., Tarjan, P., and M. Jones, “OAuth 2.0 Multiple Response Type Encoding Practices,” February 2014.
    * @description 
    OpenID Connect also uses the following OAuth 2.0 request parameter, which is defined in OAuth 2.0 Multiple Response Type Encoding Practices [OAuth.Responses]:
    
    @param {ResponseModeEnum = 'fragment' | 'query'} response_mode
        OPTIONAL. Informs the Authorization Server of the mechanism to be used for returning parameters from the Authorization Endpoint. This use of this parameter is NOT RECOMMENDED when the Response Mode that would be requested is the default mode specified for the Response Type.
**/
export enum ResponseModeEnum{
    fragment = 'fragment',
    query = 'query'
}



/**
* @namespace OIDC 
* @description 
OpenID Connect additions: 

    @param {string} nonce
        OPTIONAL. String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. Sufficient entropy MUST be present in the nonce values used to prevent attackers from guessing values. For implementation notes, see Section 15.5.2.
*/

/**
    @param {AuthDisplay='page' | 'popup' | 'touch' | 'wap'} display
        OPTIONAL. ASCII string value that specifies how the Authorization Server displays the authentication and consent user interface pages to the End-User. The defined values are:
        
        @param {AuthDisplay='page'}
            The Authorization Server SHOULD display the authentication and consent UI consistent with a full User Agent page view. If the display parameter is not specified, this is the default display mode.
        @param {AuthDisplay='popup'}
            The Authorization Server SHOULD display the authentication and consent UI consistent with a popup User Agent window. The popup User Agent window should be of an appropriate size for a login-focused dialog and should not obscure the entire window that it is popping up over.
        @param {AuthDisplay='touch'}
            The Authorization Server SHOULD display the authentication and consent UI consistent with a device that leverages a touch interface.
        @param {AuthDisplay='wap'}
            The Authorization Server SHOULD display the authentication and consent UI consistent with a "feature phone" type display.
**/
export enum AuthDisplay{
    page = 'page',
    popup = 'popup',
    touch = 'touch',
    wap = 'wap'
}



/**
 * @enum AuthPrompt 
    The Authorization Server MAY also attempt to detect the capabilities of the User Agent and present an appropriate display.

    @param {AuthPrompt='none' | 'login' | 'consent' | 'select_account'} prompt
        OPTIONAL. Space delimited, case sensitive list of ASCII string values that specifies whether the Authorization Server prompts the End-User for reauthentication and consent. The defined values are:
        
        @param {AuthPrompt='none'}
            The Authorization Server MUST NOT display any authentication or consent user interface pages. An error is returned if an End-User is not already authenticated or the Client does not have pre-configured consent for the requested Claims or does not fulfill other conditions for processing the request. The error code will typically be login_required, interaction_required, or another code defined in Section 3.1.2.6. This can be used as a method to check for existing authentication and/or consent.
        @param {AuthPrompt='login'}
            The Authorization Server SHOULD prompt the End-User for reauthentication. If it cannot reauthenticate the End-User, it MUST return an error, typically login_required.
        @param {AuthPrompt='consent'}
            The Authorization Server SHOULD prompt the End-User for consent before returning information to the Client. If it cannot obtain consent, it MUST return an error, typically consent_required.
        @param {AuthPrompt='select_account'}
            The Authorization Server SHOULD prompt the End-User to select a user account. This enables an End-User who has multiple accounts at the Authorization Server to select amongst the multiple accounts that they might have current sessions for. If it cannot obtain an account selection choice made by the End-User, it MUST return an error, typically account_selection_required.
        The prompt parameter can be used by the Client to make sure that the End-User is still present for the current session or to bring attention to the request. If this parameter contains none with any other value, an error is returned.
**/
export enum AuthPrompt{
    none = 'none',
    login = 'login', 
    consent = 'consent', 
    select_account = 'select_account'
}

/**
    @param max_age
        OPTIONAL. Maximum Authentication Age. Specifies the allowable elapsed time in seconds since the last time the End-User was actively authenticated by the OP. If the elapsed time is greater than this value, the OP MUST attempt to actively re-authenticate the End-User. (The max_age request parameter corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] max_auth_age request parameter.) When max_age is used, the ID Token returned MUST include an auth_time Claim Value.
    @param ui_locales
        OPTIONAL. End-User's preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For instance, the value "fr-CA fr en" represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation). An error SHOULD NOT result if some or all of the requested locales are not supported by the OpenID Provider.
    @param id_token_hint
        OPTIONAL. ID Token previously issued by the Authorization Server being passed as a hint about the End-User's current or past authenticated session with the Client. If the End-User identified by the ID Token is logged in or is logged in by the request, then the Authorization Server returns a positive response; otherwise, it SHOULD return an error, such as login_required. When possible, an id_token_hint SHOULD be present when prompt=none is used and an invalid_request error MAY be returned if it is not; however, the server SHOULD respond successfully when possible, even if it is not present. The Authorization Server need not be listed as an audience of the ID Token when it is used as an id_token_hint value.
        If the ID Token received by the RP from the OP is encrypted, to use it as an id_token_hint, the Client MUST decrypt the signed ID Token contained within the encrypted ID Token. The Client MAY re-encrypt the signed ID token to the Authentication Server using a key that enables the server to decrypt the ID Token, and use the re-encrypted ID token as the id_token_hint value.
    @param login_hint
        OPTIONAL. Hint to the Authorization Server about the login identifier the End-User might use to log in (if necessary). This hint can be used by an RP if it first asks the End-User for their e-mail address (or other identifier) and then wants to pass that value as a hint to the discovered authorization service. It is RECOMMENDED that the hint value match the value used for discovery. This value MAY also be a phone number in the format specified for the phone_number Claim. The use of this parameter is left to the OP's discretion.
    @param acr_values
        OPTIONAL. Requested Authentication Context Class Reference values. Space-separated string that specifies the acr values that the Authorization Server is being requested to use for processing this Authentication Request, with the values appearing in order of preference. The Authentication Context Class satisfied by the authentication performed is returned as the acr Claim Value, as specified in Section 2. The acr Claim is requested as a Voluntary Claim by this parameter.

* @returns {string}
* @memberof AuthController
**/


/**
 *  @enum AuthResponseMode 
 *  @param query
        In this mode, Authorization Response parameters are encoded in the query string added to the redirect_uri when redirecting back to the Client.
    @param fragment
        In this mode, Authorization Response parameters are encoded in the fragment added to the redirect_uri when redirecting back to the Client.
 *
 * @export
 * @enum {string}
 */
export enum AuthResponseMode{
    query = 'query',
    fragment = 'fragment'
}


