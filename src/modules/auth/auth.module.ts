import { Module } from '@nestjs/common';

/**
 * @requires Controllers
 */
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { TokenController } from './token.controller';

/**
 * @requires Services 
 */
import { AppService } from './app.service';
import { AccountsService } from '../entities/accounts/account.service';

/**
 * @requires TypeORM
 */
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * @requires Modules
 */
import { AccountsModule, Account } from '../entities/accounts';
import { ClientsModule, Client, ClientsService } from '../entities/clients';
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
         * @namespace MySql Repo
            @const DB_TYPE=mysql
            @const DB_PORT=3306
            @const DB_HOST=remotemysql.com
            @const DB_DATABASE=sv7Ti9j3K8
            @const DB_USER=sv7Ti9j3K8
            @const DB_PASSWORD=OpIEL27BkT
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
            entities: [
                Account,
                Client
            ],
        }),
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forFeature([Client]), 


        /**
         * @const modules
         */
        AccountsModule,
        SessionModule,
        ClientsModule, 

    ],
    controllers: [
        AppController, 
        AuthController,
        TokenController, 
    ],
    providers: [
        AppService,
        AccountsService,
        ClientsService, 
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}
 }


