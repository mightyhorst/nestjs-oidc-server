import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './account.controller';
import { AccountsService } from './account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountsService],
    controllers: [AccountsController],
})
export class AccountsModule { }