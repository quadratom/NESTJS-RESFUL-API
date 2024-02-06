import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    email :  string;
     
    @IsEnum(['INTERN', 'ADMIN',  'ENGINEER',{
        message : 'valid role required.'
    }])
    role : 'INTERN'| 'ADMIN'| 'ENGINEER';
}