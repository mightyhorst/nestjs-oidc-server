import { DynamicModule } from '@nestjs/common';
import { RedisModule as NestJsRedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

/**
 * @module RedisModule 
 */
export const Redis: DynamicModule = NestJsRedisModule.forRootAsync({
    imports: [ConfigModule],
    inject: [
        ConfigService,
    ],
    useFactory: (config: ConfigService): RedisModuleOptions => {
        return {
            url: config.REDIS_URL, 
            keyPrefix: config.REDIS_PREFIX,
        };
    },
});
