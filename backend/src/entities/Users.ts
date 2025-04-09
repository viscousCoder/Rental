import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Property } from "./Property";
import { Booking } from "./Booking";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  fullname!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  mobile!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  userrole!: string;

  @Column({ nullable: false, default: false })
  blocked!: boolean;

  @OneToMany(() => Property, (property) => property.user)
  properties!: Property[];

  @OneToMany(() => Booking, (booking) => booking.user, {
    eager: true, // Automatically load bookings when the user is queried
    cascade: true, // Automatically delete bookings when the user is deleted
    onDelete: "CASCADE", // Delete all bookings associated with the user when the user is deleted
  })
  bookings!: Booking[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
