import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customers.entity';
import { CreateCustomerDto } from './dto/create-customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.customersService.remove(id);
  }
}
