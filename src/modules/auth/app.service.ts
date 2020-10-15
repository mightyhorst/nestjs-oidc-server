import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis';

@Injectable()
export class AppService {
    constructor(
        private readonly redisService: RedisService
    ){}

    getHello(): string {
        return 'Hello World!';
    }

    async saveToRedis(){
        return await this.redisService.setErrorMessage('mitchy was here')
    }
    async getFromRedis(): Promise<string>{
        return await this.redisService.getErrorMessage();
    }
}
