import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes } from "@nestjs/common";
import { RoleService } from './application/role.service';
import { Role } from './domain/role.entity';
import { ValidationPipe } from "../../common/pipes/validation.pipe";

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findById(@Param('id') id: string): Promise<Role | null> {
    return this.roleService.findById(parseInt(id));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body('title') title: string): Promise<Role> {
    return this.roleService.create(title);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body('title') title: string): Promise<Role> {
    return this.roleService.update(parseInt(id), title);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(parseInt(id));
  }
}
