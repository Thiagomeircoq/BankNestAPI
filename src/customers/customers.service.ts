import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customers.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customers.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const [existingEmail, existingPhone] = await Promise.all([
      this.findByEmail(customer.email),
      this.findByPhone(customer.phone),
    ]);

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    if (existingPhone) {
      throw new ConflictException('Phone number already exists');
    }

    return this.customerRepository.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: string): Promise<Customer | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    return this.customerRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { email } });
  }

  findByPhone(phone: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { phone } });
  }

  async remove(id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const existingCustomer = await this.findOne(id);
    if (!existingCustomer) {
      throw new NotFoundException('Customer with this ID not found');
    }

    await this.customerRepository.delete({ id });
  }
}
