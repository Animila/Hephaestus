import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './application/role.service';
import { Role } from './domain/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Role | null> {
    return this.roleService.findById(id);
  }

  @Post()
  create(@Body('title') title: string): Promise<Role> {
    return this.roleService.create(title);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('title') title: string): Promise<Role> {
    return this.roleService.update(id, title);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}
