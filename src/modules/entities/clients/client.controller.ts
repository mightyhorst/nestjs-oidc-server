import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto';
import { Client } from './client.entity';
import { ClientsService } from './client.service';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client|any> {
        return this.clientsService.create(createClientDto);
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
        return this.clientsService.update(id, updateClientDto);
    }

    @Get()
    findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Client> {
        return this.clientsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.clientsService.remove(id);
    }
}