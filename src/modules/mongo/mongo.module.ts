import { Module } from '@nestjs/common';

/**
 * @import Constants
 */
import {
    PLAYBOOK_DB_URI,
    IDP_DB_URI,
} from '../../config';

/**
 * @import Providers
 */
import { mongodbProviders } from './mongo.providers';

/**
 * @description 
 *      strongly type the options to passed to the Mongo providers 
 */
export interface MongoProviderOptions{
    MONGO_URL: string;
}
export const PLAYBOOK_DB_MONGO_OPTIONS_TOKEN = 'PLAYBOOK_DB_MONGO_OPTIONS';
export const IDP_DB_MONGO_OPTIONS_TOKEN = 'IDP_DB_MONGO_OPTIONS';

@Module({
    providers: [
        ...mongodbProviders,
        {
            provide: PLAYBOOK_DB_MONGO_OPTIONS_TOKEN,
            useValue : <MongoProviderOptions>{
                MONGO_URL : PLAYBOOK_DB_URI,
            },
        },
        {
            provide: IDP_DB_MONGO_OPTIONS_TOKEN,
            useValue : <MongoProviderOptions>{
                MONGO_URL : IDP_DB_URI,
            },
        },
    ],
    exports: [
        ...mongodbProviders,
    ],
})
export class MongoDbModule {}
