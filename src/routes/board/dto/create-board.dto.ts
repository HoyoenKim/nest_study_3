import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateBoardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'userId',
        required: true,
        example: '1'
    })
    userId: number;

    @IsNotEmpty()
    @ApiProperty({
        description: 'description of the board',
        required: true,
        example: 'Board description'
    })
    contents: string;
}