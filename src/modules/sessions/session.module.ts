import * as ConnectRedis from 'connect-redis';
import * as session from 'express-session';
import { RedisService } from 'nestjs-redis';
import { NestSessionOptions, SessionModule as NestSessionModule } from 'nestjs-session';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { Redis } from '../redis/redis.module';

const RedisStore = ConnectRedis(session);

export const SessionModule = NestSessionModule.forRootAsync({
    imports: [Redis, ConfigModule],
    inject: [RedisService, ConfigService],
    useFactory: (
        redisService: RedisService,
        config: ConfigService,
    ): NestSessionOptions => {
        const redisClient = redisService.getClient();
        const store = new RedisStore({ client: redisClient as any });
        return {
            session: {
                store,
                secret: config.REDIS_SECRET,
            },
        };
    },
});
