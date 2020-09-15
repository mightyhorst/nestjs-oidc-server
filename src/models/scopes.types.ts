import { ClaimEnum } from './claims.types'

/**
 * @see 5.4.  Requesting Claims using Scope Values
 * @see https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims
 * 
 *
    @param profile
        OPTIONAL. This scope value requests access to the End-User's default profile Claims, which are: 
        
            • name, 
            • family_name, 
            • given_name, 
            • middle_name, 
            • nickname, 
            • preferred_username, 
            • profile, 
            • picture, 
            • website, 
            • gender, 
            • birthdate, 
            • zoneinfo, 
            • locale, 
            • updated_at
    
    @param email
        OPTIONAL. This scope value requests access to the claims: 
        
            • email  
            • email_verified 

    
    @param address
        OPTIONAL. This scope value requests access to the `address` Claim.

            • address 
    
    @param phone
        OPTIONAL. This scope value requests access to the `phone_number` and `phone_number_verified` Claims.

            • phone_number
            • phone_number_verified
**/
export enum ScopeEnum{
    profile = 'profile',
    email = 'email',
    address = 'address',
    phone = 'phone'  
}
/*
export const ScopeClaims = {
    profile: [
        'name', 
        'family_name', 
        'given_name', 
        'middle_name', 
        'nickname', 
        'preferred_username', 
        'profile', 
        'picture', 
        'website', 
        'gender', 
        'birthdate', 
        'zoneinfo', 
        'locale', 
        'updated_at'
    ],
    email: [
        'email',
        'email_verified'
    ],
    address: [
        'address'
    ],
    phone: [
        'phone_number', 
        'phone_number_verified'
    ]
}
*/
export const ScopeClaims = {
    profile: [
        ClaimEnum.name, 
        ClaimEnum.family_name, 
        ClaimEnum.given_name, 
        ClaimEnum.middle_name, 
        ClaimEnum.nickname, 
        ClaimEnum.preferred_username, 
        ClaimEnum.profile, 
        ClaimEnum.picture, 
        ClaimEnum.website, 
        ClaimEnum.gender, 
        ClaimEnum.birthdate, 
        ClaimEnum.zoneinfo, 
        ClaimEnum.locale, 
        ClaimEnum.updated_at
    ],
    email: [
        ClaimEnum.email,
        ClaimEnum.email_verified,
    ],
    address: [
        ClaimEnum.address,
    ],
    phone: [
        ClaimEnum.phone_number, 
        ClaimEnum.phone_number_verified, 
    ]
}
