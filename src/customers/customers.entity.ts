import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
