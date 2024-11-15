import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlayListDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly songs;

    @IsNotEmpty()
    @IsNumber()
    readonly user;
}