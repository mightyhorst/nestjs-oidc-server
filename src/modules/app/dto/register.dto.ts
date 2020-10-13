import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, } from 'class-validator';
import { IWorkspace } from 'src/models';

export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsArray()
    @IsOptional()
    workspace?: IWorkspace[];

}
