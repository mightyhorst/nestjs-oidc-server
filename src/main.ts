import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

/**
 * @requires Views
 */
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * @requires Exceptions
 */
import { AllExceptionsFilter } from './filters'

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
