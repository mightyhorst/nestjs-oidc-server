import {
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export class NoUserFound extends NotFoundException{
    constructor(id: string){
        super('No User found for ID: '+id, 'No User Found'); 
    }
}
export class WrongUsernameOrPassword extends UnauthorizedException{
    constructor(userName: string, password: string){
        super(`Wrong username: ${userName} or password: ${password}`); 

    }
}