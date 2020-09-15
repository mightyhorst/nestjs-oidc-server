import { DynamicModule } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

/**
 * @module RedisModule 
 */
export const Redis: DynamicModule = RedisModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService): RedisModuleOptions => {
        return {
            url: config.REDIS_URL, 
            keyPrefix: config.REDIS_PREFIX,
        };
    },
});
