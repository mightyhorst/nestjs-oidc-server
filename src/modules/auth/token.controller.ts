import {
    /**
     * @namespace Controllers  
     */
    Controller,
    Get,
    Post,
    Query,
    Body,
    Render,
    Redirect,
    Req,
    Res,
    UnauthorizedException,

    /**
     * @namespace Session 
     */
    Session,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * @requires Services 
 */
import { AppService } from './app.service';
import { LoginDto, LoginResponseDto } from './dto';
import { Account, AccountsService } from '../entities/accounts/';
import { Client, ClientsService } from '../entities/clients';
import { JoseService } from '../../services/jose.service';
import { v4 as uuidv4 } from 'uuid';

/**
 * @namespace OIDC Exceptions 
 */
import {
    OidcException,
    Oauth2AndOidcErrorsEnum,
    OidcBadRequestException,
} from '../../exceptions';
/**
 * @namespace Auth types  
 */
import {
    ScopeEnum,
    ResponseTypeEnum,
    ResponseModeEnum,
    AuthDisplay,
    AuthPrompt,
    RoleEnum,
    InteractionModel,
    AuthRequestRequiredParamters,
    GrantTypeEnum,
    TokenRequestRequiredParamters, 
} from '../../models';

/**
 * @requires Pipes and Validators 
 */
import {
    ClientIdValidator,
    ClientSecretValidator, 
    GrantTypeValidator,
    RedirectUriValidator,
    ScopeValidator,
    // ResponseTypeValidator,
} from '../../pipes';



@Controller('token')
export class TokenController {

    private readonly joseService: JoseService; 

    constructor(
        private readonly appService: AppService,
        private readonly accountsService: AccountsService,
        private readonly clientsService: ClientsService,
    ) {
        this.joseService = JoseService.inject(); 
     }

    /**
     * @namespace OAuth2.0 
     * @description 
     *      The client makes a request to the token endpoint by sending the
     *      following parameters using the "application/x-www-form-urlencoded"
     *      format per Appendix B with a character encoding of UTF-8 in the HTTP
     *      request entity-body:
            
            @param {GrantTypeEnum} grant_type
                    REQUIRED.  Value MUST be set to "authorization_code".

            @param {string} code
                    REQUIRED.  The authorization code received from the
                    authorization server.

            @param {string} redirect_uri
                    REQUIRED, if the "redirect_uri" parameter was included in the
                    authorization request as described in Section 4.1.1, and their
                    values MUST be identical.

            @param {string} client_id
                    REQUIRED, if the client is not authenticating with the
                    authorization server as described in Section 3.2.1.

     * @returns {string}
     * @memberof TokenController
     */
    @Post('/')
    async postToken(
        /** @namespace Express */
        @Req() req: Request,
        @Res() res: Response,

        /** @namespace Session */
        @Session() session: { interaction?: InteractionModel },

        /** @namespace OAuth */
        // @Query('response_type', ResponseTypeValidator) response_type: ResponseTypeEnum[],
        @Body('grant_type', GrantTypeValidator) grant_type: GrantTypeEnum,
        @Body('client_id', ClientIdValidator) client_id: string,
        @Body('client_secret', ClientSecretValidator) client_secret: string,
        @Body('redirect_uri', RedirectUriValidator) redirect_uri: string,
        @Body('scope', ScopeValidator) scope: ScopeEnum[],
        // @Query('state') state?: string,

        /** @namespace OIDC */
        // @Query('response_mode') response_mode?: ResponseModeEnum,
        // @Query('nonce') nonce?: string,
        // @Query('display') display?: AuthDisplay,
        // @Query('prompt') prompt?: AuthPrompt,
        // @Query('max_age') max_age?: number,
        // @Query('ui_locales') ui_locales?: string,
        // @Query('id_token_hint') id_token_hint?: string,
        // @Query('login_hint') login_hint?: string,
        // @Query('acr_values') acr_values?: string,

    ) {

        /**
         * @step Find the client or throw 
         */
        const noClientFoundError = new OidcBadRequestException(
            Oauth2AndOidcErrorsEnum.invalid_client,
            TokenRequestRequiredParamters.client_id
        );
        
        let client: Client;
        try{
            client = await this.clientsService.findOne(client_id);
            console.log('🚀 client: ', {client});

            /**
             * @step check the client_secret 
             */
            if(client.client_secret !== client_secret){

                console.error('🤬 client_secret: ', {client_secret, 'client.client_secret': client.client_secret});

                throw new OidcBadRequestException(
                    Oauth2AndOidcErrorsEnum.invalid_client,
                    TokenRequestRequiredParamters.client_secret
                );
            }
        }
        catch(err){
            throw noClientFoundError; 
        }

        if (!client) throw noClientFoundError; 

        /**
         * @step Make sure redirect uri is valid or throw 
         */
        const redirect_uris = client.redirect_uris.split(',');
        const isRedirectUri = redirect_uris.find(uri => {
            return redirect_uri === uri
        });
        if (!isRedirectUri) throw new OidcBadRequestException(
            Oauth2AndOidcErrorsEnum.invalid_request,
            TokenRequestRequiredParamters.redirect_uri
        );


        /**
         * @step Save the session for login or register 
         */
        
    }
}
