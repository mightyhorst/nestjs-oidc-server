import { AuthDisplay, AuthPrompt, ResponseModeEnum, ResponseTypeEnum, ScopeEnum } from "./"

export interface InteractionModel{
    /** @namespace Session */
    loginAttempts: number;
    clientIp?: string | string[]; 

    /** @namespace OAuth2 */
    client_id?: string;
    redirect_uri?: string;
    scope?: ScopeEnum[];
    response_type?: ResponseTypeEnum[];
    state?: string;
        
    /** @namespace OIDC */
    response_mode?: ResponseModeEnum;
    nonce?: string;
    display?: AuthDisplay;
    prompt?: AuthPrompt;
    max_age?: number;
    ui_locales?: string;
    id_token_hint?: string;
    login_hint?: string;
    acr_values?: string;
}
