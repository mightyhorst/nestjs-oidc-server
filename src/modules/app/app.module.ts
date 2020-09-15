import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { AppService } from './app.service';

/**
 * @requires TypeORM
 */
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * @requires Modules
 */
import { AccountsModule, Account } from '../entities/accounts';
import { SessionModule } from '../sessions/session.module';

/**
 * @requires ENV - check env set 
 */
import {ok} from 'assert';
ok(process.env.DB_TYPE);
ok(process.env.DB_PORT);
ok(process.env.DB_HOST);
ok(process.env.DB_DATABASE);
ok(process.env.DB_USER);
ok(process.env.DB_PASSWORD);

@Module({
    imports: [

        /**
         * @const MySql Repo
            DB_TYPE=mysql
            DB_PORT=3306
            DB_HOST=remotemysql.com
            DB_DATABASE=sv7Ti9j3K8
            DB_USER=sv7Ti9j3K8
            DB_PASSWORD=OpIEL27BkT
         */
        TypeOrmModule.forRoot({
            type: 'mysql',
            port: Number(process.env.DB_PORT) || 3306,
            host: process.env.DB_HOST || 'remotemysql.com',
            database: process.env.DB_DATABASE || 'sv7Ti9j3K8',
            username: process.env.DB_USER || 'sv7Ti9j3K8',
            password: process.env.DB_PASSWORD || 'OpIEL27BkT',
            // autoLoadEntities: true,
            // synchronize: true,
            entities: [Account],
        }),

        /**
         * @const modules
         */
        AccountsModule,
        SessionModule,

    ],
    controllers: [
        // AppController, 
        AuthController
    ],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
 }


