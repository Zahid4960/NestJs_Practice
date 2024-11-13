import { Optional } from "@nestjs/common";
import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO {
    @IsString()
    @Optional()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @Optional()
    readonly artists: string[];

    @IsDateString()
    @Optional()
    readonly releaseDate: Date;

    @IsMilitaryTime()
    @Optional()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}