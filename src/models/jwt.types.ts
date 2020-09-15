import {IClaims} from './claims.types';
import {IWorkspace } from './workspace.types';

export interface JwtPayload{
    iss: string;
    iat: string;
    aud: string[]; 
}
export interface IdTokenPayload extends JwtPayload, IClaims{
    workspaces: IWorkspace[];
}
export interface AccessTokenPayload extends JwtPayload{
    workspaces: IWorkspace[];
} 

