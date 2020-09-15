import {NotFoundException} from '@nestjs/common';

export class NoUserFound extends NotFoundException{
    constructor(id: string){
        super('No User found for ID: '+id, 'No User Found'); 
    }
}