import * as mongoose from 'mongoose';

/**
 * @import Constants
 */
import {
    PLAYBOOK_DB_CONNECTION_TOKEN,
    IDP_DB_CONNECTION_TOKEN
} from '../../config';

import {
    MongoProviderOptions,
    PLAYBOOK_DB_MONGO_OPTIONS_TOKEN,
    IDP_DB_MONGO_OPTIONS_TOKEN
} from './mongo.module';


/**
 * @description 
 * 
 *      Step 1: 
 *      The provider looks up the token for `IDP_DB_MONGO_OPTIONS_TOKEN`
 *      which gets an object literal of options that implements `MongoProviderOptions`
 * 
 *      Step 2: 
 *      The `MongoProviderOptions` get injected into the constructor of the `useFactory`
 *      This dynamically creates a connection to Mongo using the `MONGO_URL` from the options 
 * 
 *      Step 3: 
 *      The Module uses the key `PLAYBOOK_DB_CONNECTION_TOKEN` from the constants file (which is also just the string "PLAYBOOK_DB_CONNECTION_TOKEN")
 *      
 *      Step 4: 
 *      Now when we inject the Repository in the constructor of a service 
 *      We can use the `@Inject(PLAYBOOK_DB_CONNECTION_TOKEN)` which will resolve to the mongo connection created by the factory 
 *      
 */
export const mongodbProviders = [
    {
        provide: PLAYBOOK_DB_CONNECTION_TOKEN,
        useFactory: async (options: MongoProviderOptions): Promise<mongoose.Connection> => {
            return await mongoose.createConnection(
                options.MONGO_URL, 
                { 
                    useNewUrlParser : true, 
                    useFindAndModify : false, 
                    useUnifiedTopology: true 
                });
        },
        inject: [PLAYBOOK_DB_MONGO_OPTIONS_TOKEN]
    },
    {
        provide: IDP_DB_CONNECTION_TOKEN,
        useFactory: async (options: MongoProviderOptions): Promise<mongoose.Connection> => {
            return await mongoose.createConnection(
                options.MONGO_URL, { 
                    useNewUrlParser : true, 
                    useFindAndModify : false, 
                    useUnifiedTopology: true 
                });
        },
        inject: [IDP_DB_MONGO_OPTIONS_TOKEN]
    }
];