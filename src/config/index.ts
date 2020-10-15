export * from './config.module';
export * from './config.service';

import {ok} from 'assert';
ok(process.env.ISSUER, '💀 No ISSUER provided');
export const ISSUER = process.env.ISSUER; 



/**
 * @namespace MongoDB
 * @description Provider Tokens 
 */
export const PLAYBOOK_DB_CONNECTION_TOKEN='PLAYBOOK_DB_CONNECTION_TOKEN';
export const IDP_DB_CONNECTION_TOKEN='IDP_DB_CONNECTION_TOKEN';

/**
 * @namespace MongoDB
 * @description URI to mongo DB
 */
ok(process.env.PLAYBOOK_DB_URI, '💀 No PLAYBOOK_DB_URI provided');
export const PLAYBOOK_DB_URI = process.env.PLAYBOOK_DB_URI;

ok(process.env.IDP_DB_URI, '💀 No DB_URI provided');
export const IDP_DB_URI = process.env.IDP_DB_URI;

