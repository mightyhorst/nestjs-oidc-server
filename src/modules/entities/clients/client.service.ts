import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from './dto';
import { Client } from './client.entity';
import { NoClientFound } from './client.errors';


@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,
    ) { }

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const client = new Client();

        // client.workspaces = createClientDto.workspaces;
        client.client_name = createClientDto.client_name;
        

        /**
         * @optional 
         */
        if(client.client_id_issued_at) client.client_id_issued_at = createClientDto.client_id_issued_at;
        if(client.client_secret) client.client_secret = createClientDto.client_secret;
        if(client.client_secret_expires_at) client.client_secret_expires_at = createClientDto.client_secret_expires_at;
        if(client.registration_access_token) client.registration_access_token = createClientDto.registration_access_token;
        if(client.registration_client_uri_path) client.registration_client_uri_path = createClientDto.registration_client_uri_path;
        if(client.contacts) client.contacts = createClientDto.contacts;
        if(client.application_type) client.application_type = createClientDto.application_type;
        if(client.client_name) client.client_name = createClientDto.client_name;
        if(client.logo_uri) client.logo_uri = createClientDto.logo_uri;
        if(client.tos_uri) client.tos_uri = createClientDto.tos_uri;
        if(client.post_logout_redirect_uris) client.post_logout_redirect_uris = createClientDto.post_logout_redirect_uris;
        if(client.token_endpoint_auth_method) client.token_endpoint_auth_method = createClientDto.token_endpoint_auth_method;
        if(client.token_endpoint_auth_signing_alg) client.token_endpoint_auth_signing_alg = createClientDto.token_endpoint_auth_signing_alg;
        if(client.policy_uri) client.policy_uri = createClientDto.policy_uri;
        if(client.jwks_uri) client.jwks_uri = createClientDto.jwks_uri;
        if(client.jwk_encryption_uri) client.jwk_encryption_uri = createClientDto.jwk_encryption_uri;
        if(client.jwks) client.jwks = createClientDto.jwks;
        if(client.x509_uri) client.x509_uri = createClientDto.x509_uri;
        if(client.x509_encryption_uri) client.x509_encryption_uri = createClientDto.x509_encryption_uri;
        if(client.sector_identifier_uri) client.sector_identifier_uri = createClientDto.sector_identifier_uri;
        if(client.subject_type) client.subject_type = createClientDto.subject_type;
        if(client.request_object_signing_alg) client.request_object_signing_alg = createClientDto.request_object_signing_alg;
        if(client.userinfo_signed_response_alg) client.userinfo_signed_response_alg = createClientDto.userinfo_signed_response_alg;
        if(client.userinfo_encrypted_response_alg) client.userinfo_encrypted_response_alg = createClientDto.userinfo_encrypted_response_alg;
        if(client.userinfo_encrypted_response_enc) client.userinfo_encrypted_response_enc = createClientDto.userinfo_encrypted_response_enc;
        if(client.id_token_signed_response_alg) client.id_token_signed_response_alg = createClientDto.id_token_signed_response_alg;
        if(client.id_token_encrypted_response_alg) client.id_token_encrypted_response_alg = createClientDto.id_token_encrypted_response_alg;
        if(client.id_token_encrypted_response_enc) client.id_token_encrypted_response_enc = createClientDto.id_token_encrypted_response_enc;
        if(client.default_max_age) client.default_max_age = createClientDto.default_max_age;
        if(client.require_auth_time) client.require_auth_time = createClientDto.require_auth_time;
        if(client.default_acr_values) client.default_acr_values = createClientDto.default_acr_values;
        if(client.initiate_login_uri) client.initiate_login_uri = createClientDto.initiate_login_uri;
        if(client.post_logout_redirect_uri) client.post_logout_redirect_uri = createClientDto.post_logout_redirect_uri;
        if(client.request_uris) client.request_uris = createClientDto.request_uris;
        if(client.grant_types) client.grant_types = createClientDto.grant_types;
        if(client.response_types) client.response_types = createClientDto.response_types;

        client.created_at = (new Date());
        client.updated_at = (new Date());

        let createdClient: Client;
        try{
            createdClient = await this.clientsRepository.save(client);
            return createdClient; 
        }
        catch(err){
            console.error('🥊 Save client error: ', err); 
            return err; 
        }
    }
    
    async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
        
        let client:Client = await this.clientsRepository.findOne(id);

        if(!client) throw new NoClientFound(id);

        if(client.client_id_issued_at) client.client_id_issued_at = updateClientDto.client_id_issued_at;
        if(client.client_secret) client.client_secret = updateClientDto.client_secret;
        if(client.client_secret_expires_at) client.client_secret_expires_at = updateClientDto.client_secret_expires_at;
        if(client.registration_access_token) client.registration_access_token = updateClientDto.registration_access_token;
        if(client.registration_client_uri_path) client.registration_client_uri_path = updateClientDto.registration_client_uri_path;
        if(client.contacts) client.contacts = updateClientDto.contacts;
        if(client.application_type) client.application_type = updateClientDto.application_type;
        if(client.client_name) client.client_name = updateClientDto.client_name;
        if(client.logo_uri) client.logo_uri = updateClientDto.logo_uri;
        if(client.tos_uri) client.tos_uri = updateClientDto.tos_uri;
        if(client.post_logout_redirect_uris) client.post_logout_redirect_uris = updateClientDto.post_logout_redirect_uris;
        if(client.token_endpoint_auth_method) client.token_endpoint_auth_method = updateClientDto.token_endpoint_auth_method;
        if(client.token_endpoint_auth_signing_alg) client.token_endpoint_auth_signing_alg = updateClientDto.token_endpoint_auth_signing_alg;
        if(client.policy_uri) client.policy_uri = updateClientDto.policy_uri;
        if(client.jwks_uri) client.jwks_uri = updateClientDto.jwks_uri;
        if(client.jwk_encryption_uri) client.jwk_encryption_uri = updateClientDto.jwk_encryption_uri;
        if(client.jwks) client.jwks = updateClientDto.jwks;
        if(client.x509_uri) client.x509_uri = updateClientDto.x509_uri;
        if(client.x509_encryption_uri) client.x509_encryption_uri = updateClientDto.x509_encryption_uri;
        if(client.sector_identifier_uri) client.sector_identifier_uri = updateClientDto.sector_identifier_uri;
        if(client.subject_type) client.subject_type = updateClientDto.subject_type;
        if(client.request_object_signing_alg) client.request_object_signing_alg = updateClientDto.request_object_signing_alg;
        if(client.userinfo_signed_response_alg) client.userinfo_signed_response_alg = updateClientDto.userinfo_signed_response_alg;
        if(client.userinfo_encrypted_response_alg) client.userinfo_encrypted_response_alg = updateClientDto.userinfo_encrypted_response_alg;
        if(client.userinfo_encrypted_response_enc) client.userinfo_encrypted_response_enc = updateClientDto.userinfo_encrypted_response_enc;
        if(client.id_token_signed_response_alg) client.id_token_signed_response_alg = updateClientDto.id_token_signed_response_alg;
        if(client.id_token_encrypted_response_alg) client.id_token_encrypted_response_alg = updateClientDto.id_token_encrypted_response_alg;
        if(client.id_token_encrypted_response_enc) client.id_token_encrypted_response_enc = updateClientDto.id_token_encrypted_response_enc;
        if(client.default_max_age) client.default_max_age = updateClientDto.default_max_age;
        if(client.require_auth_time) client.require_auth_time = updateClientDto.require_auth_time;
        if(client.default_acr_values) client.default_acr_values = updateClientDto.default_acr_values;
        if(client.initiate_login_uri) client.initiate_login_uri = updateClientDto.initiate_login_uri;
        if(client.post_logout_redirect_uri) client.post_logout_redirect_uri = updateClientDto.post_logout_redirect_uri;
        if(client.request_uris) client.request_uris = updateClientDto.request_uris;
        if(client.grant_types) client.grant_types = updateClientDto.grant_types;
        if(client.response_types) client.response_types = updateClientDto.response_types;

        client.updated_at = (new Date());

        try{
            return await this.clientsRepository.save(client);
        }
        catch(err){
            console.error('🥊 Update client error: ', err); 
            return err; 
        }
    }

    async findAll(): Promise<Client[]> {
        return this.clientsRepository.find();
    }

    async findOne(id: string): Promise<Client> {
        return this.clientsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.clientsRepository.delete(id);
    }
}