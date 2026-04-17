import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll() {
    return this.employeesService.findAll();
  }

  @Post()
  async create(@Body() body: CreateEmployeeDto) {
    return this.employeesService.create(body);
  }

  // NEW endpoint
  @Get('workload')
  async getWorkload() {
    return this.employeesService.getWeeklyWorkload();
  }
}