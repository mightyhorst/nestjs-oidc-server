import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IWorkspace } from 'src/models';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-json")
    workspaces: IWorkspace[]; 

    @Column()
    login: string; 

    @Column()
    email : string;

    @Column({ default: true })
    enabled: boolean;  

    /**
     * @const password 
     * @example 
     *  const hash = await bcrypt.hash(passwordInPlaintext, 10);
        const isPasswordMatching = await bcrypt.compare(passwordInPlaintext, hashedPassword);
     */
    @Column()
    crypted_password: string;  

    /** ~~~~~~~~~~~~~~~~~~~~
     * 
     * @const optionals 
     * 
     */
    @Column({ nullable: true })
    name? : string;        

    @Column({ nullable: true })
    name_ja_kana_jp? : string;

    @Column({ nullable: true })
    name_ja_hani_jp? : string;

    @Column({ nullable: true })
    given_name? : string;

    @Column({ nullable: true })
    given_name_ja_kana_jp? : string;

    @Column({ nullable: true })
    given_name_ja_hani_jp? : string;

    @Column({ nullable: true })
    family_name? : string;

    @Column({ nullable: true })
    family_name_ja_kana_jp? : string;

    @Column({ nullable: true })
    family_name_ja_hani_jp? : string;

    @Column({ nullable: true })
    middle_name? : string;

    @Column({ nullable: true })
    middle_name_ja_kana_jp? : string;  

    @Column({ nullable: true })
    middle_name_ja_hani_jp? : string;   

    @Column({ nullable: true })
    nickname? : string;   

    @Column({ nullable: true })
    preferred_username? : string;  

    @Column({ nullable: true })
    profile? : string;  

    @Column({ 
        nullable: true, 
        default: 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&hatColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
    })
    picture? : string;   

    @Column({ nullable: true })
    website? : string;  

    @Column({ default: false })
    email_verified?: boolean;		

    @Column({ nullable: true })
    gender? : string;

    @Column({ nullable: true })
    birthdate? : string;

    @Column({ nullable: true })
    zoneinfo? : string;

    @Column({ nullable: true })
    locale? : string;

    @Column({ nullable: true })
    phone_number? : string;

    @Column({ default: false })
    phone_number_verified: boolean;		

    @Column({ nullable: true })
    address? : string;

    @Column({ nullable: true })
    reset_password_code? : string;            

    @Column({ 
        type: 'datetime', 
        nullable: true 
    })
    reset_password_code_timeout?: Date;

    /*
    @Column({ type: 'datetime' })
    date_only: Date;
    */
   @Column({ 
        type: 'datetime', 
        nullable: true,
        // default: () => "CURRENT_TIMESTAMP"
        default: () => (new Date()).toISOString()
    })
    created_at?: Date;

    @Column({ 
        type: 'datetime', 
        nullable: true, 
        default: () => (new Date()).toISOString()
    })
    updated_at?: Date;
}