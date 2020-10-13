import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientsService],
    controllers: [ClientsController],
})
export class ClientsModule { }