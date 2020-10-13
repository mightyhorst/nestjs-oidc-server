import { IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, IsString, IsOptional, IsEnum, IsObject, IsArray } from 'class-validator';
import { IWorkspace } from '../../../../models';

enum Gender {
    male = 'MALE',
    female = 'FEMALE'
}

export class AccountDto {

    @IsBoolean()
    enabled?: boolean;
    // crypted_password? : string;  

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    name_ja_kana_jp?: string;

    @IsOptional()
    @IsString()
    name_ja_hani_jp?: string;

    @IsOptional()
    @IsString()
    given_name?: string;

    @IsOptional()
    @IsString()
    given_name_ja_kana_jp?: string;

    @IsOptional()
    @IsString()
    given_name_ja_hani_jp?: string;

    @IsOptional()
    @IsString()
    family_name?: string;

    @IsOptional()
    @IsString()
    family_name_ja_kana_jp?: string;

    @IsOptional()
    @IsString()
    family_name_ja_hani_jp?: string;

    @IsOptional()
    @IsString()
    middle_name?: string;

    @IsOptional()
    @IsString()
    middle_name_ja_kana_jp?: string;

    @IsOptional()
    @IsString()
    middle_name_ja_hani_jp?: string;

    @IsOptional()
    @IsString()
    nickname?: string;

    @IsOptional()
    @IsString()
    preferred_username?: string;

    @IsOptional()
    @IsString()
    profile?: string;

    @IsOptional()
    @IsString()
    picture?: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsBoolean()
    @IsOptional()
    email_verified?: boolean;

    @IsOptional()
    @IsEnum(Gender)
    gender?: string;

    @IsOptional()
    birthdate?: string;

    @IsOptional()
    zoneinfo?: string;

    @IsOptional()
    locale?: string;

    @IsOptional()
    phone_number?: string;

    @IsOptional()
    phone_number_verified: boolean;

    @IsOptional()
    address?: string;

    @IsOptional()
    reset_password_code?: string;

    @IsOptional()
    reset_password_code_timeout: Date;

}
export class CreateAccountDto extends AccountDto {

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsArray()
    workspaces: IWorkspace[];

}
export class UpdateAccountDto extends AccountDto {

    @IsString()
    login?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsArray()
    workspaces?: IWorkspace[];

}