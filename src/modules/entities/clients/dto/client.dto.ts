import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {IWorkspace} from '../../../../models';

export class ClientDto {
    // id?: number; 	

    @IsNumber()
    client_id_issued_at?: number; 

    @IsNumber()
    client_secret_expires_at?: number; 

    @IsString()
    registration_access_token?: string; 
    
    @IsString()
    registration_client_uri_path?: string; 	

    @IsString()
    contacts?: string; 

    @IsString()
    application_type?: string; 	

    @IsString()
    logo_uri?: string; 	
    
    @IsString()
    tos_uri?: string; 	  
    
    @IsString()  
    post_logout_redirect_uris?: string; 
    
    @IsString()
    token_endpoint_auth_method?: string; 	
    
    @IsString()
    token_endpoint_auth_signing_alg?: string; 	
    
    @IsString()
    policy_uri?: string; 	
    
    @IsString()
    jwks_uri?: string; 	
    
    @IsString()
    jwk_encryption_uri?: string; 	
    
    @IsString()
    jwks?: string; 
    
    @IsString()
    x509_uri?: string; 	
    
    @IsString()
    x509_encryption_uri?: string; 
    
    @IsString()	
    sector_identifier_uri?: string; 
    
    @IsString()	
    subject_type?: string; 	
    
    @IsString()
    request_object_signing_alg?: string; 	
    
    @IsString()
    userinfo_signed_response_alg?: string; 	
    
    @IsString()
    userinfo_encrypted_response_alg?: string; 	
    
    @IsString()
    userinfo_encrypted_response_enc?: string; 	
    
    @IsString()
    id_token_signed_response_alg?: string; 	
    
    @IsString()
    id_token_encrypted_response_alg?: string; 	
    
    @IsString()
    id_token_encrypted_response_enc?: string; 	
    
    @IsString()
    default_max_age?: number; 
    
    @IsString()
    require_auth_time?: string; 	
    
    @IsString()
    default_acr_values?: string; 	
    
    @IsString()
    initiate_login_uri?: string; 	
    
    @IsString()
    post_logout_redirect_uri?: string; 	
    
    @IsString()
    request_uris?: string; 
    
    @IsString()
    grant_types?: string; 	
    
    @IsString()
    response_types?: string; 	
    
}
export class CreateClientDto extends ClientDto{
    
    @IsNotEmpty()
    @IsString()
    client_id: string;
    
    @IsNotEmpty()
    @IsString()
    client_name: string;
    
    @IsNotEmpty()
    @IsString()
    client_secret?: string; 

    @IsNotEmpty()
    @IsBoolean()
    trusted: boolean; 

    @IsNotEmpty()
    @IsString()
    redirect_uris: string; 

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date; 
}
export class UpdateClientDto extends ClientDto{

    @IsString()
    client_id?: string;

    @IsString()
    client_name?: string; 

    @IsString()
    client_secret?: string; 

    @IsBoolean()
    trusted?: boolean; 

    @IsDate()
    created_at?: Date;

    @IsDate()
    updated_at?: Date; 

    @IsString()
    redirect_uris?: string; 
}