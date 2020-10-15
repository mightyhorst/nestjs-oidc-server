import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { Account } from './account.entity';
import { NoUserFound, WrongUsernameOrPassword } from './account.errors';


@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
    ) { }

    async loginWithUserName(userName: string, password: string): Promise<Account>{
        const user:Account = await this.accountsRepository.findOneOrFail({
            login: userName
        });
        if(this.login(user, password)) return user; 
        else throw new WrongUsernameOrPassword(userName, password);
    }
    async loginWithEmail(email: string, password: string): Promise<Account>{
        const user:Account = await this.accountsRepository.findOneOrFail({
            email: email
        });
        console.log('😎 user', {
            user,
            bcrypt_password: bcrypt.hashSync(password, 10)
        });
        if(this.login(user, password)) return user; 
        else throw new WrongUsernameOrPassword(email, password);
    }
    login(user:Account, password: string): boolean{
        const isMatch = bcrypt.compareSync(password, user.bcrypt_password);
        console.log(isMatch ? `🎉 password matches` : `❌ password mismatches`, {isMatch, userPwd: user.bcrypt_password, password});
        return isMatch; 
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = new Account();

        account.workspaces = createAccountDto.workspaces;
        account.login = createAccountDto.login;
        account.email = createAccountDto.email;
        
        /**
         * @const password 
         * @example 
         *  const hash = await bcrypt.hash(passwordInPlaintext, 10);
            const isPasswordMatching = await bcrypt.compare(passwordInPlaintext, hashedPassword);
        */
        account.bcrypt_password = bcrypt.hashSync(createAccountDto.password, 10);

        account.enabled = true;
        account.email_verified = false;
        account.phone_number_verified = false;

        /**
         * @optional 
         */
        if(account.name) account.name = createAccountDto.name;
        if(account.name_ja_kana_jp) account.name_ja_kana_jp = createAccountDto.name_ja_kana_jp;
        if(account.name_ja_hani_jp) account.name_ja_hani_jp = createAccountDto.name_ja_hani_jp;
        if(account.given_name) account.given_name = createAccountDto.given_name;
        if(account.given_name_ja_kana_jp) account.given_name_ja_kana_jp = createAccountDto.given_name_ja_kana_jp;
        if(account.given_name_ja_hani_jp) account.given_name_ja_hani_jp = createAccountDto.given_name_ja_hani_jp;
        if(account.family_name) account.family_name = createAccountDto.family_name;
        if(account.family_name_ja_kana_jp) account.family_name_ja_kana_jp = createAccountDto.family_name_ja_kana_jp;
        if(account.family_name_ja_hani_jp) account.family_name_ja_hani_jp = createAccountDto.family_name_ja_hani_jp;
        if(account.middle_name) account.middle_name = createAccountDto.middle_name;
        if(account.middle_name_ja_kana_jp) account.middle_name_ja_kana_jp = createAccountDto.middle_name_ja_kana_jp;
        if(account.middle_name_ja_hani_jp) account.middle_name_ja_hani_jp = createAccountDto.middle_name_ja_hani_jp;
        if(account.nickname) account.nickname = createAccountDto.nickname;
        if(account.preferred_username) account.preferred_username = createAccountDto.preferred_username;
        if(account.profile) account.profile = createAccountDto.profile;
        if(account.picture) account.picture = createAccountDto.picture;
        if(account.website) account.website = createAccountDto.website;
        if(account.gender) account.gender = createAccountDto.gender;
        if(account.birthdate) account.birthdate = createAccountDto.birthdate;
        if(account.zoneinfo) account.zoneinfo = createAccountDto.zoneinfo;
        if(account.locale) account.locale = createAccountDto.locale;
        if(account.phone_number) account.phone_number = createAccountDto.phone_number;
        if(account.address) account.address = createAccountDto.address;
        // if(account.reset_password_code) account.reset_password_code = createAccountDto.reset_password_code;
        // if(account.reset_password_code_timeout) account.reset_password_code_timeout = createAccountDto.reset_password_code_timeout;

        account.created_at = (new Date());
        // account.created_at = (new Date()).toISOString();
        account.updated_at = (new Date());

        let createdAccount: Account;
        try{
            createdAccount = await this.accountsRepository.save(account);
            return createdAccount; 
        }
        catch(err){
            console.error('🥊 Save account error: ', err); 
            return err; 
        }
    }
    
    async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
        
        let account:Account = await this.accountsRepository.findOne(id);

        if(!account) throw new NoUserFound(id);

        if(account.workspaces) account.workspaces = updateAccountDto.workspaces;
        if(account.login) account.login = updateAccountDto.login;
        if(account.email) account.email = updateAccountDto.email;

        /**
         * @const password 
         * @example 
         *  const hash = await bcrypt.hash(passwordInPlaintext, 10);
            const isPasswordMatching = await bcrypt.compare(passwordInPlaintext, hashedPassword);
        */
        if(account.crypted_password) account.crypted_password = bcrypt.hashSync(updateAccountDto.password, 10);
        if(account.enabled) account.enabled = updateAccountDto.enabled;
        if(account.name) account.name = updateAccountDto.name;
        if(account.name_ja_kana_jp) account.name_ja_kana_jp = updateAccountDto.name_ja_kana_jp;
        if(account.name_ja_hani_jp) account.name_ja_hani_jp = updateAccountDto.name_ja_hani_jp;
        if(account.given_name) account.given_name = updateAccountDto.given_name;
        if(account.given_name_ja_kana_jp) account.given_name_ja_kana_jp = updateAccountDto.given_name_ja_kana_jp;
        if(account.given_name_ja_hani_jp) account.given_name_ja_hani_jp = updateAccountDto.given_name_ja_hani_jp;
        if(account.family_name) account.family_name = updateAccountDto.family_name;
        if(account.family_name_ja_kana_jp) account.family_name_ja_kana_jp = updateAccountDto.family_name_ja_kana_jp;
        if(account.family_name_ja_hani_jp) account.family_name_ja_hani_jp = updateAccountDto.family_name_ja_hani_jp;
        if(account.middle_name) account.middle_name = updateAccountDto.middle_name;
        if(account.middle_name_ja_kana_jp) account.middle_name_ja_kana_jp = updateAccountDto.middle_name_ja_kana_jp;
        if(account.middle_name_ja_hani_jp) account.middle_name_ja_hani_jp = updateAccountDto.middle_name_ja_hani_jp;
        if(account.nickname) account.nickname = updateAccountDto.nickname;
        if(account.preferred_username) account.preferred_username = updateAccountDto.preferred_username;
        if(account.profile) account.profile = updateAccountDto.profile;
        if(account.picture) account.picture = updateAccountDto.picture;
        if(account.website) account.website = updateAccountDto.website;
        if(account.email_verified) account.email_verified = false;
        if(account.gender) account.gender = updateAccountDto.gender;
        if(account.birthdate) account.birthdate = updateAccountDto.birthdate;
        if(account.zoneinfo) account.zoneinfo = updateAccountDto.zoneinfo;
        if(account.locale) account.locale = updateAccountDto.locale;
        if(account.phone_number) account.phone_number = updateAccountDto.phone_number;
        if(account.phone_number_verified) account.phone_number_verified = updateAccountDto.phone_number_verified;
        if(account.address) account.address = updateAccountDto.address;
        if(account.reset_password_code) account.reset_password_code = updateAccountDto.reset_password_code;
        if(account.reset_password_code_timeout) account.reset_password_code_timeout = updateAccountDto.reset_password_code_timeout;

        account.updated_at = (new Date());

        try{
            return await this.accountsRepository.save(account);
        }
        catch(err){
            console.error('🥊 Update account error: ', err); 
            return err; 
        }
    }

    async findAll(): Promise<Account[]> {
        return this.accountsRepository.find();
    }

    async findOne(id: string): Promise<Account> {
        return this.accountsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.accountsRepository.delete(id);
    }
}