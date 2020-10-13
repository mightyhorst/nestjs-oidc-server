import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IWorkspace } from 'src/models';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    /*
    @Column({
        type: 'simple-json',
        nullable: true,
    })
    workspaces: IWorkspace[]; 
    */ 

    /** ~~~~~~~~~~~~~~~~~~~~
     * 
     * @const required 
     * 
     */
    @Column()
    client_id: string; 	
    
    @Column()
    client_secret: string; 	
    
    @Column()
    client_name: string; 

    @Column()
    redirect_uris: string; 

    @Column({ default: true })
    trusted: boolean; 
    
    /** ~~~~~~~~~~~~~~~~~~~~
     * 
     * @const optionals 
     * 
     */
    @Column({ nullable: true })
    client_id_issued_at: number; 

    @Column({ nullable: true })
    client_secret_expires_at?: number; 

    @Column({ nullable: true })
    registration_access_token?: string; 	

    @Column({ nullable: true })
    registration_client_uri_path?: string; 	

    @Column({ nullable: true })
    contacts?: string; 

    @Column({ nullable: true })
    application_type?: string; 	
        
    @Column({ nullable: true })
    logo_uri?: string; 	

    @Column({ nullable: true })
    tos_uri?: string; 	    

    @Column({ nullable: true })
    post_logout_redirect_uris?: string; 

    @Column({ nullable: true })
    token_endpoint_auth_method?: string; 	

    @Column({ nullable: true })
    token_endpoint_auth_signing_alg?: string; 
    
    @Column({ nullable: true })
    policy_uri?: string; 	

    @Column({ nullable: true })
    jwks_uri?: string; 	

    @Column({ nullable: true })
    jwk_encryption_uri?: string; 	

    @Column({ nullable: true })
    jwks?: string; 

    @Column({ nullable: true })
    x509_uri?: string; 	

    @Column({ nullable: true })
    x509_encryption_uri?: string; 	

    @Column({ nullable: true })
    sector_identifier_uri?: string; 	

    @Column({ nullable: true })
    subject_type?: string; 	

    @Column({ nullable: true })
    request_object_signing_alg?: string; 	
    
    @Column({ nullable: true })
    userinfo_signed_response_alg?: string; 	

    @Column({ nullable: true })
    userinfo_encrypted_response_alg?: string; 	

    @Column({ nullable: true })
    userinfo_encrypted_response_enc?: string; 	

    @Column({ nullable: true })
    id_token_signed_response_alg?: string; 
    
    @Column({ nullable: true })
    id_token_encrypted_response_alg?: string; 	

    @Column({ nullable: true })
    id_token_encrypted_response_enc?: string; 	

    @Column({ nullable: true })
    default_max_age?: number; 

    @Column({ nullable: true })
    require_auth_time?: string;
    
    @Column({ nullable: true })
    default_acr_values?: string; 	

    @Column({ nullable: true })
    initiate_login_uri?: string; 	

    @Column({ nullable: true })
    post_logout_redirect_uri?: string; 	

    @Column({ nullable: true })
    request_uris?: string; 

    @Column({ nullable: true })
    grant_types?: string; 	

    @Column({ nullable: true })
    response_types?: string; 

    /*
    @Column({ type: 'datetime' })
    date_only: Date;
    */
   @Column({ 
        type: 'datetime', 
        nullable: true,
        // default: () => "CURRENT_TIMESTAMP"
        default: () => (new Date()).toISOString()
    })
    created_at?: Date;

    @Column({ 
        type: 'datetime', 
        nullable: true, 
        default: () => (new Date()).toISOString()
    })
    updated_at?: Date;
}