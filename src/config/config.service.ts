import { Injectable } from '@nestjs/common';
import {ok} from 'assert';

/**
* @step ENV
* @desc Check ENV 
* @author Mitchy 
*/
ok(process.env.REDIS_URL);
ok(process.env.REDIS_SECRET);
ok(process.env.REDIS_PREFIX);

/**
 * Config Service injected as Config 
 *
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
    // public readonly REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
    public readonly REDIS_URL = process.env.REDIS_URL;
    public readonly REDIS_SECRET = process.env.REDIS_SECRET;
    public readonly REDIS_PREFIX = process.env.REDIS_PREFIX;
}
