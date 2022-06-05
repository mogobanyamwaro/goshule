import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MpesaService } from './mpesa.service';

@Controller('providers/mpesa')
@ApiTags('Mpesa')
export class MpesaController {
  constructor(private readonly mpesaService: MpesaService) {}

  @Post('/callback')
  @ApiOperation({ summary: 'Lipa na Mpesa callback' })
  async callback(@Body() input: any) {
    console.log(input);
    const resultCode = input.Body.stkCallback.ResultCode;
    console.log(resultCode);
    return resultCode;
  }

  @Post('/lipa-na-mpesa')
  @ApiOperation({ summary: 'Lipa na Mpesa' })
  @ApiBody({
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        phone: { type: 'string' },
      },
    },
  })
  async lipaNaMpesa(@Body() input: any) {
    return await this.mpesaService.lipaNaMpesa(input.phone, input.amount);
  }
}
