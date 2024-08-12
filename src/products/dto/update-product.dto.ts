import { Category } from '@/enums/category';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name' })
  name?: string;

  @ApiProperty({ description: 'Product price' })
  price?: string;

  @ApiProperty({ description: 'Product brand' })
  brand?: string;

  @ApiProperty({ description: 'Product category' })
  category?: Category;

  @ApiProperty({ description: 'Product photo' })
  photoURL?: string;

  @ApiProperty({ description: 'Product discount' })
  discount?: number;

  // Поля специфічні для категорії

  @ApiProperty({ description: 'CPU model', required: false })
  CPU?: string;

  @ApiProperty({ description: 'RAM size in GB', required: false })
  RAM?: number;

  @ApiProperty({ description: 'ROM size in GB', required: false })
  ROM?: number;

  @ApiProperty({ description: 'Video card model', required: false })
  video_card?: string;

  @ApiProperty({ description: 'VRAM size in GB', required: false })
  VRAM?: number;

  @ApiProperty({ description: 'Screen refresh rate in Hz', required: false })
  refresh_rate?: number;

  // Для смартфонів:

  @ApiProperty({ description: 'Functionality', required: false })
  functionality?: string;

  @ApiProperty({ description: 'Battery capacity in mAh', required: false })
  batteryCapacity?: number;

  @ApiProperty({ description: 'Number of SIM slots', required: false })
  sim_slot?: number;

  // Загальні поля для інших категорій:

  @ApiProperty({ description: 'Type of product', required: false })
  type?: string;

  @ApiProperty({ description: 'Product compatibility', required: false })
  compatibility?: string;

  @ApiProperty({ description: 'RAM version', required: false })
  RAM_version?: string;

  @ApiProperty({ description: 'Country of origin', required: false })
  origin?: string;

  @ApiProperty({ description: 'Type of connection', required: false })
  type_conection?: string;

  @ApiProperty({ description: 'Wireless standard', required: false })
  wireless_standart?: string;

  @ApiProperty({ description: 'Term of the license', required: false })
  term_of_the_license?: string;

  @ApiProperty({ description: 'Number of users allowed', required: false })
  Number_of_users?: number;

  @ApiProperty({ description: 'Screen resolution', required: false })
  screenResolution?: string;

  @ApiProperty({ description: 'Is it a smart TV?', required: false })
  smartTV?: boolean;

  @ApiProperty({
    description: 'Type of matrix used in the display',
    required: false,
  })
  matrix_type?: string;

  @ApiProperty({ description: 'Operating system', required: false })
  OS?: string;
}
