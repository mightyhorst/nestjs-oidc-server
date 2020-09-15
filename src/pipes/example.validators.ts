import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthValidationPipe implements PipeTransform<any> {

    /**
    * @step 1
    * @param metatype
    * @desc 
        
        Next note that we are using destructuring to extract the `metatype` field (extracting just this member from an `ArgumentMetadata`) into our `metatype` parameter. 
        
        This is just shorthand for getting the full `ArgumentMetadata` and then having an additional statement to assign the metatype variable.
    * @author Mitchy 

    * @param {Request} modelToValidate - request or model to be validated 
    * @param {ArgumentMetadata} metatype - raw dto transformed into typed DTO with plainToClass()
    */
    async transform(modelToValidate: any, { metatype }: ArgumentMetadata) {

        /**
        * @step 2
        * @method toValidate()
        * @desc 
            Next, note the helper function toValidate(). 
            
            It's responsible for bypassing the validation step when the current argument being processed is a native JavaScript type. 
            
            These can't have validation decorators attached, so there's no reason to run them through the validation step.


        * @author Mitchy 
        */
        if (!metatype || !this.toValidate(metatype)) {
            return modelToValidate;
        }

        /**
        * @step 3
        * @method plainToClass()
        * @desc 
            Next, we use the class-transformer function `plainToClass()` 
            
            This transforms our plain JavaScript argument object into a typed object.
            
            Now we can apply validation. 
            
            The reason we must do this is that the incoming post body object, 
            when deserialized from the network request, 
            does not have any type information 
            
            (this is the way the underlying platform, such as Express, works).
            
            `Class-validator` needs to use the validation decorators we defined for our DTO earlier, 
            
            so we need to perform this transformation to treat the incoming body as an appropriately decorated object, not just a plain vanilla object.


        * @author Mitchy 
        */
        const dto = plainToClass(metatype, modelToValidate);

        /**
        * @step 4
        * @method validate
        * @see https://github.com/typestack/class-validator#passing-options
        * @author Mitchy 
        */
        const validationErrors = await validate(dto);

        /**
        * @step 5
        * @desc 
            Finally, as noted earlier, since this is a validation pipe it either returns the modelToValidate unchanged, or throws an exception.

        * @author Mitchy 
        */
        if (validationErrors.length > 0) {
            console.error('🥊 validationErrors: ', validationErrors); 
            throw new BadRequestException('🥊 Validation failed');
        }
        else return modelToValidate;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}