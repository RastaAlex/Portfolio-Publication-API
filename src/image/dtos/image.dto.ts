import { IsNotEmpty, IsString, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CommentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  text: string;
}

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  description: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[];
}