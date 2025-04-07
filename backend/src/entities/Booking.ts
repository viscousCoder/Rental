import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./Users";
import { Property } from "./Property";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Users, (user) => user.properties)
  @JoinColumn({ name: "userId" })
  user!: Users;

  @ManyToOne(() => Property, (property) => property.id)
  @JoinColumn({ name: "propertyId" })
  property!: Property;

  @Column({ type: "date" })
  moveInDate!: Date;

  @Column({ type: "varchar", length: 100 })
  duration!: string;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  totalAmount!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
