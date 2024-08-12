import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '@/enums/category';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('category/:category')
  async findAllinCategory(
    @Param('category') category: Category,
  ): Promise<ProductEntity[]> {
    return this.productsService.findAllinCategory(category);
  }

  @Get('mainpage/:amount')
  async findItemsForMainPage(
    @Param('amount', ParseIntPipe) amount: number,
  ): Promise<ProductEntity[]> {
    return this.productsService.findItemsForMainPage(amount);
  }

  @Get(':id')
  async findByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
