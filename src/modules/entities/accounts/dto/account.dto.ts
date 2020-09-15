import {IWorkspace} from '../../../../models';

export class AccountDto {

    enabled?: boolean;
    // crypted_password? : string;  
    name? : string;        
    name_ja_kana_jp? : string;
    name_ja_hani_jp? : string;
    given_name? : string;
    given_name_ja_kana_jp? : string;
    given_name_ja_hani_jp? : string;
    family_name? : string;
    family_name_ja_kana_jp? : string;
    family_name_ja_hani_jp? : string;
    middle_name? : string;
    middle_name_ja_kana_jp? : string;  
    middle_name_ja_hani_jp? : string;   
    nickname? : string;   
    preferred_username? : string;  
    profile? : string;  
    picture? : string;   
    website? : string;  
    email_verified?: boolean;		
    gender? : string;
    birthdate? : string;
    zoneinfo? : string;
    locale? : string;
    phone_number? : string;
    phone_number_verified: boolean;		
    address? : string;
    reset_password_code? : string;            
    reset_password_code_timeout: Date;

}
export class CreateAccountDto extends AccountDto{

    login: string; 
    email : string;
    password: string; 
    workspaces: IWorkspace[];

}
export class UpdateAccountDto extends AccountDto{

    login?: string; 
    email?: string;
    password?: string; 
    workspaces?: IWorkspace[];

}