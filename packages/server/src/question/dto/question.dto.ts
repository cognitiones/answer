import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class FindOneDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}