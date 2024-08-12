import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async findByOAuthGithubId(OAuthGithubId: number) {
    return this.userRepository.findOneBy({
      OAuthGithubId,
    });
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      ...dto,
      OAuthGithubId: dto.OAuthGithubId ? Number(dto.OAuthGithubId) : null,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}
