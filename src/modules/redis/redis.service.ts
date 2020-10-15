import {
    Injectable,
    Inject,
} from '@nestjs/common';

import { promisify } from 'util';

import {
    RedisClient,
} from 'redis';

import { RedisService as NestjsRedisService } from 'nestjs-redis';

import {
    // REDIS_CONNECTION_TOKEN,
} from '../../config';


@Injectable()
export class RedisService {

    // client: RedisClient;
    client;

    /*
    // -- Generic
    del: (key: string) => Promise<boolean>;
    // -- Hash
    hget: (key: string, field: string) => Promise<string>;
    hgetall: (key: string) => Promise<{ [key: string]: string }>;
    hmget: (key: string, ...args: string[]) => Promise<string[]>
    hdel: (key: string, field: string) => Promise<number>;
    hset: (key: string, field: string, value: string) => Promise<number>;
    hmset: (key: string, ...args: (string | number)[]) => Promise<string>;
    // -- Set
    sadd: (key: string, ...args: (string | number)[]) => Promise<boolean>;
    spop: (key: string) => Promise<string>;
    */ 

    constructor(
        // @Inject(REDIS_CONNECTION_TOKEN) client: RedisClient,
        private readonly redisService: NestjsRedisService,
    ) {
        // -- Set the client for sync access
        // this.client = this.redisService.getClient();;
        this.client = this.redisService.getClient();

        // -- Promisify all required methods
        /*
        this.del = promisify(this.client.del).bind(this.client);
        this.hget = promisify(this.client.hget).bind(this.client);
        this.hgetall = promisify(this.client.hgetall).bind(this.client);
        this.hmget = promisify(this.client.hmget).bind(this.client)
        this.hdel = promisify(this.client.hdel).bind(this.client);
        this.hset = promisify(this.client.hset).bind(this.client);
        this.hmset = promisify(this.client.hmset).bind(this.client);
        this.sadd = promisify(this.client.sadd).bind(this.client);
        this.spop = promisify(this.client.spop).bind(this.client);
        */

    }

    /**
     * Set the error_message value in a hash set
     * @param key Name of the key we will use to access this data
     * @param message Value to set
     */
    async setErrorMessage(message: string): Promise<number> {
        return await this.client.set('bonersquad_error_message', message);
    }

    /**
     * Get the error_message value in a hash set
     *
     * @param {string} key
     * @returns {Promise<string>}
     * @memberof RedisService
     */
    async getErrorMessage(): Promise<string> {
        return await this.client.get('bonersquad_error_message');
    }

}