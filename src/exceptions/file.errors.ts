export class FileReadFailed extends Error{
    path: string; 
    constructor(path:string, msg: string){
        super(msg);
        this.path = path; 
    }
}
export class FileWriteFailed extends Error{
    path: string; 
    constructor(path:string, msg?: string){
        super(msg || `😵 FileWriteFailed for path: ${path}`);
        this.path = path; 
    }
}

export class JsonParseFailed extends Error{
    contents: string; 
    constructor(contents, msg?: string){
        super(msg || `😵 JsonParseFailed for contents: ${contents}`);
        this.contents = contents; 
    }
}

export class JsonStringifyFailed extends Error{
    contents: string; 
    constructor(contents, msg?: string){
        super(msg || `😵 JsonStringifyFailed for contents: ${contents}`);
        this.contents = contents; 
    }
}

export class HttpClientError extends Error{
    url:string;
    res:Response;
    constructor(url:string, res:Response, msg?:string){
        super(msg || `😵 HttpClientError for url: ${url}`);
        this.url = url; 
        this.res = res; 
        console.error(`😵 HttpClientError: ${msg}`, {
            url, 
            res: this.res, 
            stack: this.stack
        }); 
    }
}

