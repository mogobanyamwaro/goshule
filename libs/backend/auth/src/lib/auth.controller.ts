import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginInput } from './dtos/auth.input';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginInput })
  @ApiOperation({
    summary: 'Login A User',
  })
  async login(
    @Body() input: LoginInput,
    @Req() req: Request,
    @Res() res: Response
  ) {
    console.log(input);
    const result = await this.authService.login(input);
    //@ts-ignore
    res.cookie('refreshToken', {
      //@ts-ignore
      value: result.refreshToken,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    //@ts-ignore
    res.json({ result });
    return 'hello';
  }
}
