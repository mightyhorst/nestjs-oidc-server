import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/auth/auth.module';

/**
 * @requires Services
 */
import { JoseService } from './services/jose.service';

 /**
 * @requires middleware
 */
import * as requestIp from 'request-ip';

/**
 * @requires Views
 */
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * @requires Exceptions
 */
import { AllExceptionsFilter } from './filters'

import {ok} from 'assert';
ok(process.env.PORT, '💀 PORT not set...')
const PORT = process.env.PORT;

/**
 * @method bootstrap
 * @description get started ... 🤓
 */
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    /**
     * @namespace JWKs 
     */
    await seedJwks(); 
    
    
     /**
     * @namespace middleware
     */
    app.set('trust proxy', true); 
    app.use(requestIp.mw());


    /**
    * @step MVC
    * @desc Register assets and views 
    * @author Mitchy 
    */
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    /**
    * @step Exceptions
    * @desc Global exception filters
    * @author Mitchy 
    */
    app.useGlobalFilters(new AllExceptionsFilter());

    /**
    * @step listen
    * @desc Listen of PORT 
    * @author Mitchy 
    */
    await app.listen(PORT); 
    console.log(`🥝 ... listening on PORT: ${PORT}`); 
}
bootstrap();

/**
 * @method seedJwks 
 * @description Read the JWKs from the jwk.json 
 */
async function seedJwks(){
    const joseService = JoseService.inject();
    try {
        await joseService.importKeystoreFromFile();
    }
    catch (err) {
        console.log('🤬 failed to import the JWKs from the jwk file');
        throw err; 
    }
    return joseService.getKeystoreJson();
}
