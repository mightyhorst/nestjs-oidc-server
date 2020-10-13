import {JWK, JWS} from 'node-jose';
import {join} from 'path';
import {writeFileSync, readFileSync} from 'fs';
import fetch from 'node-fetch';

/**
 * @requires Models
 */
import {IdTokenPayload, AccessTokenPayload} from '../models';

/**
 * @requires Errors
 */
import { 
    FileReadFailed, 
    FileWriteFailed, 
    JsonParseFailed, 
    JsonStringifyFailed, 
    ImportKeystoreError,
    HttpClientError,
    JwtSignError,
    NoJwkFoundError, 
} from '../exceptions';



interface JwkJson{
    kty: string;    
    kid: string;    
    use?: 'sig' | 'enc';
    alg: 'RS256',
    e: string;    
    n: string;    
}
interface KeystoreJson{
    keys: JwkJson[]
}




export class JoseService{
    private static singleton:JoseService;
    private keystore: JWK.KeyStore;

    private hackKeys: JWK.Key[] = []; 
    
    public static inject(){
        if(!JoseService.singleton) JoseService.singleton = new JoseService(); 
        return JoseService.singleton;
    }
    private constructor(){
        this.keystore = JWK.createKeyStore();
    }

    /**
     * @namespace Keystore 
     * @method getKeystore 
     * @description Get the active keystore 
     *
     * @returns
     * @memberof JoseService
     */
    getKeystore(){
        return this.keystore; 
    }

    /**
     * @namespace Keystore 
     * @method getKeystore 
     * @description Serialise the keystore as Json 
     *
     * @returns
     * @memberof JoseService
     */
    getKeystoreJson(isPrivate: boolean = false){
        const outputJson = this.keystore.toJSON(isPrivate);
        console.log('🤖 JwkService.getJson:', outputJson);
        return outputJson; 
    }

    writeKeyStore(filePath?:string): string{

        /**
        * @step 1
        * @desc write json
        * @author Mitchy 
        */
        filePath = filePath || join(__dirname, '../../public/.well-known/', 'jwks.json');
        const contents = JSON.stringify(this.getKeystoreJson(true), null, 4);

        try{
            writeFileSync(filePath, contents, 'utf8');
        }
        catch(err){
            throw new FileWriteFailed(filePath); 
        }

        /**
        * @step 2
        * @desc read json 
        * @author Mitchy 
        */
       const fileContents = readFileSync(filePath, 'utf8');
       return fileContents; 
    }

    async importKeystoreFromJson(fileContentsJson: KeystoreJson){
        try{
            this.keystore = await JWK.asKeyStore(fileContentsJson);
            return this.getKeystoreJson();
        }
        catch(err){
            console.log('Import key store failed.', err.message);
            throw new ImportKeystoreError(err.message, fileContentsJson);
        }
    }
    async importKeystoreFromFile(filePath?: string){
        filePath = filePath || join(__dirname, '../../public/.well-known/', 'jwks.json');
        let fileContents:string, fileContentsJson:KeystoreJson;
        try{
            fileContents = readFileSync(filePath, 'utf8');
        }
        catch(err){
            console.log('Import key store failed.', err.message);
            throw new FileReadFailed(filePath, err.message);
        }
        try{
            fileContentsJson = JSON.parse(fileContents);
        }
        catch(err){
            console.log('Import key store failed.', err.message);
            throw new JsonParseFailed(fileContents, err.message);
        }
        
        return this.importKeystoreFromJson(fileContentsJson); 

    }

    async importKeystoreFromUrl(url: string){
        let res:Response, fileJson:KeystoreJson; 
        try{
            res = await fetch(url);
            if(res.ok){
                fileJson = await res.json();
            }
            else throw new HttpClientError(url, res); 
        }
        catch(err){
            throw new HttpClientError(url, res, err.message); 
        }

        return this.importKeystoreFromJson(fileJson);

    }

    async addKey(key: JWK.Key): Promise<JWK.Key>{
        
        key = await this.keystore.add(key);

        this.hackKeys.push(key);

        return key; 
    }

    /**
     * @namespace Keystore 
     * @method createSignKey 
     * @description 
     *      Create and add a new signing key to the keystore
     *      This is for the signing of a token 
     *
     * @returns {Promise<JWK.Key>} signingKey 
     * @memberof JoseService
     */
    async createSignKey(): Promise<JWK.Key>{
        const key = await this.keystore.generate('RSA', 2048, {alg:'RS256', use: 'sig', key_ops:["sign", "decrypt", "unwrap"]});
        console.log('🤖 JwkService.createSignKey', key);

        this.addKey(key);
        
        return key; 
    }

    /**
     * @namespace Keystore 
     * @method createEncryptKey 
     * @description 
     *      Create and add a new encryption key to the keystore
     *      This is for the encryption of a token 
     *
     * @returns {Promise<JWK.Key>} encryptionKey 
     * @memberof JoseService
     */
    async createEncryptKey(): Promise<JWK.Key>{
        const key = await this.keystore.generate('RSA', 2048, {alg:'RS256', use: 'enc', key_ops: ["encrypt","verify", "wrap"]});
        console.log('🤖 JwkService.createEncryptKey', key);

        this.addKey(key);

        return key; 
    }

    /**
     * @namespace Keystore 
     * @method createEncryptKey 
     * @description 
     *      Create and add a new encryption key to the keystore
     *      This is for the encryption of a token 
     *
     * @returns {JWK.RawKey} encryptionKey 
     * @memberof JoseService
     */
    getKeyById(kid: string){
        const key = this.keystore.get(kid);
        console.log('🤖 JwkService.getSignKey: ', key);
        return key; 
    }

    /**
     * @namespace Keystore 
     * @method createEncryptKey 
     * @description 
     *      Create and add a new encryption key to the keystore
     *      This is for the encryption of a token 
     *
     * @returns {JWK.RawKey} key | failed   
     * @memberof JoseService
     */
    findKey(use: 'sig'|'enc'){
        /*
        const keystoreJson = this.getKeystoreJson();
        
        if(keystoreJson['keys']){
            const keys = keystoreJson['keys'];
            const key = keys.find(key=>key.use === use);
            console.log('🤖 JwkService.findKey: ', key);

            const kid = key['id'];
            return this.getKeyById(kid);
        }
        else {
            throw new NoJwkFoundError(use, keystoreJson); 
        } 
        */
       return this.hackKeys.find((key:JWK.Key)=> key.use === use);
    }

    /**
     * @namespace Keystore 
     * @method getSignKey 
     * @description 
     *      Get the first signing key 
     *
     * @returns {JWK.Key} signingKey | failed  
     * @memberof JoseService
     */
    getSignKey() {
        const key = this.findKey('sig');
        console.log('🤖 JwkService.getSignKey: ', key);
        return key; 
    }

    /**
     * @namespace Keystore 
     * @method getEncKey 
     * @description 
     *      Get the first encryption key  
     *
     * @returns {JWK.Key}  signingKey | failed  
     * @memberof JoseService
     */
    getEncKey() {
        const key = this.findKey('enc');
        console.log('🤖 JwkService.getEncKey: ', key);
        return key; 
    }

    /**
     * @namespace JWT 
     * @method createSignedToken  
     * @description 
     *      Create a signed JWT token 
     *
     * @returns {JWT}  signedToken
     * @memberof JoseService
     */
    async createSignedToken(payload): Promise<JWS.CreateSignResult> {

        try{
            payload = JSON.stringify(payload)
        }
        catch(err){
            throw new JsonStringifyFailed(payload);
        }

        const key = this.getSignKey(); 

        let jwt: JWS.CreateSignResult; 
        try{
            jwt = await JWS.createSign({alg: "RS256", format: 'compact'}, key).
                update(payload, 'utf8').
                final();

            console.log('🤖 JwkService.createSignedToken: ', jwt);
            return jwt; 
        }
        catch(err){
            throw new JwtSignError(key, payload, err.message);
        }
    }

    async createIdToken(idToken: IdTokenPayload){
        return this.createSignedToken(idToken);
    }
    async createAccessToken(accessToken: AccessTokenPayload){
        return this.createSignedToken(accessToken);
    }

    /**
     * @namespace JWT 
     * @method createSignedToken  
     * @description 
     *      Create a signed JWT token 
     *
     * @returns {JWT}  signedToken
     * @memberof JoseService
     */
    validateToken<T>(jwt): {isValid: boolean, payload?: T, error?: string}{

        try{
            const payload: T = <T>{};   
            console.log('🤖 JwkService.validateToken: ', payload);
            return {
                isValid: true,
                payload
            }; 
        }
        catch(err){
            console.log('❌ JwkService.validateToken: ', err.message);
            return {
                isValid: true,
                error: err.message
            }; 
        }
    }
}


