import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '@go-shule/backend/enums';
export class CreateUserInput {
  @ApiProperty({ description: 'the password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ description: 'the email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'the email of the user',
    enum: UserRole,
    example: UserRole.PARENT,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
