import { MinLength, MaxLength, IsOptional, IsNotEmpty } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";
import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";

export class UpdateBoardDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'contents',
        required: true,
        example: 'board contents'
    })
    contents: string;
}

//export class UpdateBoardDto extends PartialType(CreateBoardDto) {};
//export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {};
//export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {};