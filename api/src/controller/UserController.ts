
import { User } from "../models/user";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";
import UserInterface from "../interfaces/user";


@Route('/user')
export default class UserController extends Controller {
  
  @SuccessResponse('201', 'Created')
  @Post()
  async create(@Body() data: UserInterface): Promise<UserInterface> {
    try {
      const {name, email} = data;
      const newUser = await User.create({name, email}); 
      return newUser.toJSON() as UserInterface;
    } catch (error: any) {
      this.setStatus(500); 
      throw new Error(error.message);
    }
  }

  @SuccessResponse('200', '')
  @Get()
  async get(): Promise<UserInterface[]> {
    try {
      const users = await User.findAll(); 
      return users.map((user) => user.toJSON() as UserInterface);
    } catch (error: any) {
      this.setStatus(500); 
      throw new Error(error.message);
    }
  }

  @SuccessResponse('200', 'Deleted')
  @Delete('/{id}')
  async delete(@Path() id: number): Promise<string> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        this.setStatus(404);
        throw new Error('User not found');
      }
      await user.destroy();
      return `User with ID ${id} deleted successfully`;
    } catch (error: any) {
      this.setStatus(500); 
      throw new Error(error.message);
    }
  }

  @SuccessResponse('200', 'Updated')
  @Put('/{id}')
  async update(@Path() id: number, @Body() data: UserInterface): Promise<UserInterface | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        this.setStatus(404); 
        return null;
      }
      await user.update(data);
      return user.toJSON() as UserInterface;
    } catch (error: any) {
      this.setStatus(500); 
      throw new Error(error.message);
    }
  }
}