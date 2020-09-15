import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * @requires Exceptions 
 */
import {OidcException, OidcErrorsEnum} from '../../exceptions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    // const err = new OidcException(OidcErrorsEnum.access_denied, 'https://jwt.io');
    // throw err; 
    return 'swagger should go here'; 
    return this.appService.getHello();
  }
}
