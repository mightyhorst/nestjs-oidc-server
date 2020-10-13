import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { IWorkspace } from '../../../../models';

export class LoginDto {

    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsString()
    @IsOptional()
    userName?: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
