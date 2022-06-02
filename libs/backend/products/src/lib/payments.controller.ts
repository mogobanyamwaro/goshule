import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  @ApiOperation({
    summary: 'Get Products',
  })
  @Get('/')
  getProducts() {
    return 'Hello Products';
  }
}
