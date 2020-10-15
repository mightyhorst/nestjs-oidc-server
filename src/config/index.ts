export * from './config.module';
export * from './config.service';

import {ok} from 'assert';
ok(process.env.ISSUER, '💀 No ISSUER provided');
export const ISSUER = process.env.ISSUER; 

// ok(process.env.REDIS_CONNECTION_TOKEN, '💀 No REDIS_CONNECTION_TOKEN provided');
// export const REDIS_CONNECTION_TOKEN = process.env.REDIS_CONNECTION_TOKEN;
