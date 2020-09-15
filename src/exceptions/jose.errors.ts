import {JWK} from 'node-jose';

/**
 * Failed to import keystore 
 *
 * @export
 * @class ImportKeystoreError
 * @extends {Error}
 */
export class ImportKeystoreError extends Error{
    
    type:string;
    fileContents:string;

    constructor(msg:string, fileContents:string|any){
        super(msg);
        this.type = 'ImportKeystoreError';
        this.fileContents = fileContents; 
        console.error(`😵 ImportKeystoreError: ${msg}`, {fileContents, stack: this.stack}); 
    }
}


/**
 * Failed to sign JWT
 *
 * @export
 * @class JwtSignError
 * @extends {Error}
 */
export class JwtSignError<T> extends Error{
    key;
    payload: T;
    constructor(key, payload: T, msg?:string){
        super(msg || `😵 JwtSignError: ${msg}`);
        this.key = key; 
        this.payload = payload; 
        console.error(`😵 JwtSignError: ${msg}`, {
            key, 
            payload, 
            stack: this.stack
        });
    }
    toJson(){
        return {
            isSuccess: false,
            msg: this.message,
            key: this.key,
            payload: this.payload, 
        }
    }
}

/**
 * Failed to No JWK Found
 *
 * @export
 * @class NoJwkFoundError
 * @extends {Error}
 */
export class NoJwkFoundError extends Error{
    use:string;
    keystoreJson; 
    constructor(use:string, keystoreJson, msg?:string){
        super(msg || `😵 NoJwkFoundError: ${msg}`);
        this.use = use; 
        this.keystoreJson = keystoreJson; 
        console.error(`😵 NoJwkFoundError: ${msg}`, {
            use, 
            keystoreJson: this.keystoreJson, 
            stack: this.stack
        });
    }
    toJson(){
        return {
            isSuccess: false,
            msg: this.message,
            use: this.use,
            keystoreJson: this.keystoreJson, 
        }
    }
}

