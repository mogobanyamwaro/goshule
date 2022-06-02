import { User } from '@go-shule/backend/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '@go-shule/backend/dtos';
import { HashHelper } from '@go-shule/backend/shared';
@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async createUser(user: CreateUserInput) {
    const { password, ...rest } = user;
    const exist = await this.findOneByEmail(user.email);
    if (exist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'User already exist',
      };
    }
    const encrypted_password = await HashHelper.encrypy(password);
    const newUser = this.userRepository.create({
      password: encrypted_password,
      ...rest,
    });
    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return {
      code: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
