import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto, LoginDto } from './dto';
import { Account } from './account.entity';
import { AccountsService } from './account.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Post()
    create(@Body() createAccountDto: CreateAccountDto): Promise<Account|any> {
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

@Controller('login')
export class LoginController{

    constructor(private readonly accountsService: AccountsService) { }

    @Post('/')
    postLogin(@Body() loginDto: LoginDto): Promise<Account>{
        if(loginDto.email)
            return this.accountsService.loginWithEmail(loginDto.email, loginDto.password);
        else if(loginDto.userName)
            return this.accountsService.loginWithUserName(loginDto.userName, loginDto.password);
        else 
            throw new UnauthorizedException(loginDto);
    }
}

@Controller('register')
export class RegisterController{

    constructor(private readonly accountsService: AccountsService) { }

    @Post('/')
    postRegister(@Body() createAccountDto: CreateAccountDto): Promise<Account|any> {
        return this.accountsService.create(createAccountDto);
    }
}
