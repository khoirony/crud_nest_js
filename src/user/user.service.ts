import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ) {}
        
  createUser(request: CreateUserDto) {
    const User = this.userRepository.create(request);
    return this.userRepository.save(User);
  }

  getUser(){
    return this.userRepository.find();
  }

  async deleteUser(userId: number) {
    // get existing data
    let user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if(!user){
      throw new BadRequestException('user tidak ditemukan');
    }

    //execute delete user
    this.userRepository.remove(user);
  }
        
  findUsersById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId
      }
    });
  }

  async updateUser(userId: number, request: CreateUserDto){
    const userExist = await this.userRepository.findOne({
      where: {
          id: userId
      }
    });

    if(!userExist){
      throw new BadRequestException("data tidak ditemukan");
    }

    // Logic Update
    userExist.email = request.email;
    userExist.password = request.password;
    userExist.username = request.username;
        
    return this.userRepository.save(userExist);

    return this.userRepository
      .createQueryBuilder()
      .update(userExist)
      .where('id: :userid', {userid: userId})
      .getQuery();
  }
}
