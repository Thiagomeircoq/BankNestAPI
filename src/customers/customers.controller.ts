import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './interface/customers.interface';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCustomersDto: Customers) {
    this.customersService.create(createCustomersDto);
  }

  @Get()
  async findAll(): Promise<Customers[]> {
    return this.customersService.findAll();
  }
}
