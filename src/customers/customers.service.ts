import { Injectable } from '@nestjs/common';
import { Customers } from './interface/customers.interface';

@Injectable()
export class CustomersService {
  private customers: Customers[] = [];

  create(customers: Customers) {
    this.customers.push(customers);
  }

  findAll(): Customers[] {
    return this.customers;
  }
}
