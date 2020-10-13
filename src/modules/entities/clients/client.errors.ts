import {NotFoundException} from '@nestjs/common';

export class NoClientFound extends NotFoundException{
    constructor(id: string){
        super('No Client found for ID: '+id, 'No Client Found'); 
    }
}