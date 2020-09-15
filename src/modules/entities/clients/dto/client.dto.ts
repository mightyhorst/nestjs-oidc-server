import {IWorkspace} from '../../../../models';

export class ClientDto {
    // id: number; 	
    client_id_issued_at: number; 
    client_secret?: string; 	
    client_secret_expires_at?: number; 
    registration_access_token?: string; 	
    registration_client_uri_path?: string; 	
    contacts?: string; 
    application_type?: string; 	
    client_name?: string; 	
    logo_uri?: string; 	
    tos_uri?: string; 	    
    post_logout_redirect_uris?: string; 
    token_endpoint_auth_method?: string; 	
    token_endpoint_auth_signing_alg?: string; 	
    policy_uri?: string; 	
    jwks_uri?: string; 	
    jwk_encryption_uri?: string; 	
    jwks?: string; 
    x509_uri?: string; 	
    x509_encryption_uri?: string; 	
    sector_identifier_uri?: string; 	
    subject_type?: string; 	
    request_object_signing_alg?: string; 	
    userinfo_signed_response_alg?: string; 	
    userinfo_encrypted_response_alg?: string; 	
    userinfo_encrypted_response_enc?: string; 	
    id_token_signed_response_alg?: string; 	
    id_token_encrypted_response_alg?: string; 	
    id_token_encrypted_response_enc?: string; 	
    default_max_age?: number; 
    require_auth_time?: string; 	
    default_acr_values?: string; 	
    initiate_login_uri?: string; 	
    post_logout_redirect_uri?: string; 	
    request_uris?: string; 
    grant_types?: string; 	
    response_types?: string; 	
    
}
export class CreateClientDto extends ClientDto{
    client_id: string;
    trusted: boolean; 
    created_at: Date;
    updated_at: Date; 
    redirect_uris: string; 
}
export class UpdateClientDto extends ClientDto{
    client_id?: string;
    trusted?: boolean; 
    created_at?: Date;
    updated_at?: Date; 
    redirect_uris?: string; 
}