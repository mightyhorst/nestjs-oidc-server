import { IsEmail, IsNotEmpty, IsOptional, IsString, } from 'class-validator';
// import { IWorkspace } from '../../../../models';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
