import { IsEmail, IsNotEmpty, IsOptional, IsString, } from 'class-validator';

export class LoginResponseDto {

    @IsString()
    @IsOptional()
    code?: string; 

    @IsString()
    @IsOptional()
    id_token?: string; 

    @IsString()
    @IsOptional()
    access_token?: string; 

    @IsString()
    @IsOptional()
    state?: string; 

    @IsString()
    @IsOptional()
    nonce?: string; 
}
