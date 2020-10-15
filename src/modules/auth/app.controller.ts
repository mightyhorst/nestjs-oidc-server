import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * @requires Exceptions 
 */
import {OidcException, Oauth2AndOidcErrorsEnum} from '../../exceptions';

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

  @Get('/save2redis')
  async getSave2Redis(){
    try{
      console.log('save to redis');
      const number = await this.appService.saveToRedis();
      console.log('save to redis', {number});
    }
    catch(err){
      return err; 
    }

    
    return await this.appService.getFromRedis(); 
  }

}
