import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { Account } from './account.entity';
import { AccountsService } from './account.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Post()
    create(@Body() createAccountDto: CreateAccountDto): Promise<Account|any> {
        // return Promise.resolve(createAccountDto);
        return this.accountsService.create(createAccountDto);
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<Account> {
        return this.accountsService.update(id, updateAccountDto);
    }

    @Get()
    findAll(): Promise<Account[]> {
        return this.accountsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Account> {
        return this.accountsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.accountsService.remove(id);
    }
}