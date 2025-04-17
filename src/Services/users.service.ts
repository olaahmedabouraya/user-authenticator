import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Http/Requests/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CustomError } from 'src/Exceptions/custom-exception';
import { Error } from 'src/Constants/error';
import { Regex } from 'src/Constants/regex';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ name });
    if (existingUser) {
      throw new CustomError(Error.USERNAME_ALREADY_EXISTS);
    }
    if (!this.validatePassword(password)) {
      throw new CustomError(Error.INVALID_PASSWORD_INPUT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    try {
      return await newUser.save();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationMessages = [error.message];
        throw new CustomError(Error.INVALID_INPUTS(validationMessages));
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new CustomError(Error.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError(Error.INVALID_CREDENTIALS);
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  validatePassword(password: string): boolean {
    return Regex.passwordPattern.test(password);
  }
}
