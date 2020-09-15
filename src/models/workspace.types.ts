/**
 * Workspace 
 *
 * @export
 * @interface IWorkspace
 */
export interface IWorkspace{
    workspace: string; 
    role: RoleEnum;
}

/**
 * Role 
 *
 * @export
 * @enum {string} 
 */
export enum RoleEnum{
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    WRITER = 'WRITER',
    READER = 'READER',
    LEAD = 'LEAD',
}