import { Client } from "../modules/entities/clients";
import { Account } from "../modules/entities/accounts";
import { AuthDisplay, AuthPrompt, ResponseModeEnum, ResponseTypeEnum, ScopeEnum } from "./"

export interface InteractionModel{
    /** @namespace Session */
    loginAttempts: number;
    clientIp?: string | string[]; 
    
    /** @namespace Client */
    client?: Client; 
    
    /** @namespace Account */
    account?: Account; 

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

    /** @namespace Temporary */
    code?: string;
    id_token?: string;
    access_token?: string;
}
