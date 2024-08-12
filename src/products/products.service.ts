import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { LaptopDetailsEntity } from './entities/category-details/laptop-details.entity';
import { ComputerDetailsEntity } from './entities/category-details/computer-details.entity';
import { SmartphoneDetailsEntity } from './entities/category-details/smartphone-details.entity';
import { SoftwareDetailsEntity } from './entities/category-details/software-details.entity';
import { AccessoriesDetailsEntity } from './entities/category-details/accessories-details.entity';
import { SmartHomeDetailsEntity } from './entities/category-details/smartHome-details.entity';
import { TVDetailsEntity } from './entities/category-details/TV-details.entity';
import { KitchenDetailsEntity } from './entities/category-details/kitchen-details.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '@/enums/category';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(LaptopDetailsEntity)
    private readonly laptopDetailsRepository: Repository<LaptopDetailsEntity>,
    @InjectRepository(ComputerDetailsEntity)
    private readonly computerDetailsRepository: Repository<ComputerDetailsEntity>,
    @InjectRepository(SmartphoneDetailsEntity)
    private readonly smartphoneDetailsRepository: Repository<SmartphoneDetailsEntity>,
    @InjectRepository(SoftwareDetailsEntity)
    private readonly softwareDetailsRepository: Repository<SoftwareDetailsEntity>,
    @InjectRepository(AccessoriesDetailsEntity)
    private readonly accessoriesDetailsRepository: Repository<AccessoriesDetailsEntity>,
    @InjectRepository(SmartHomeDetailsEntity)
    private readonly smartHomeDetailsRepository: Repository<SmartHomeDetailsEntity>,
    @InjectRepository(TVDetailsEntity)
    private readonly tvDetailsRepository: Repository<TVDetailsEntity>,
    @InjectRepository(KitchenDetailsEntity)
    private readonly kitchenDetailsRepository: Repository<KitchenDetailsEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const { category, ...details } = createProductDto;
    let savedDetail;

    switch (category) {
      case Category.Laptop:
        savedDetail = await this.laptopDetailsRepository.save(details);
        break;
      case Category.Computer:
        savedDetail = await this.computerDetailsRepository.save(details);
        break;
      case Category.Smartphone:
        savedDetail = await this.smartphoneDetailsRepository.save(details);
        break;
      case Category.Software:
        savedDetail = await this.softwareDetailsRepository.save(details);
        break;
      case Category.Accessories:
        savedDetail = await this.accessoriesDetailsRepository.save(details);
        break;
      case Category.SmartHome:
        savedDetail = await this.smartHomeDetailsRepository.save(details);
        break;
      case Category.TV:
        savedDetail = await this.tvDetailsRepository.save(details);
        break;
      case Category.Kitchen:
        savedDetail = await this.kitchenDetailsRepository.save(details);
        break;
      default:
        throw new Error('Unknown category');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      [category.toLowerCase() + 'Details']: savedDetail,
    });
    return this.productRepository.save(product);
  }

  async findItemsForMainPage(amount: number): Promise<ProductEntity[]> {
    const categories = Object.values(Category);

    const products: ProductEntity[] = [];

    for (const category of categories) {
      const categoryProducts = await this.productRepository.find({
        where: { category },
        take: amount,
      });

      products.push(...categoryProducts);
    }

    return products;
  }

  async findAllinCategory(category: Category): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: { category },
      relations: [
        'laptopDetails',
        'computerDetails',
        'smartphoneDetails',
        'softwareDetails',
        'accessoriesDetails',
        'smartHomeDetails',
        'tvDetails',
        'kitchenDetails',
      ],
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: { id },
      relations: [
        'laptopDetails',
        'computerDetails',
        'smartphoneDetails',
        'softwareDetails',
        'accessoriesDetails',
        'smartHomeDetails',
        'tvDetails',
        'kitchenDetails',
      ],
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({
      where: { id },
      relations: [
        'laptopDetails',
        'computerDetails',
        'smartphoneDetails',
        'softwareDetails',
        'accessoriesDetails',
        'smartHomeDetails',
        'tvDetails',
        'kitchenDetails',
      ],
    });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
