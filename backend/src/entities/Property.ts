import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";
import { Amenities } from "./Amenities";
import { Images } from "./Images";
import { Booking } from "./Booking";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  propertyName!: string;

  @Column()
  propertyType!: string;

  @Column()
  location!: string;

  @Column()
  monthlyRent!: string;

  @Column()
  securityDeposit!: string;

  @Column()
  roomType!: string;

  @Column()
  noofrooms!: string;

  @Column()
  gender!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  houseRules!: string;

  @Column()
  contactName!: string;

  @Column()
  contactPhone!: string;

  @Column()
  contactEmail!: string;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user!: Users;

  @OneToMany(() => Amenities, (amenity) => amenity.property, {
    cascade: true,
  })
  amenities!: Amenities[];

  @OneToMany(() => Images, (image) => image.property, {
    cascade: true,
    eager: true,
  })
  images!: Images[];

  @OneToMany(() => Booking, (booking) => booking.property, {
    eager: true, // Automatically load bookings when clled by me
    cascade: true, // Automatically delete bookings when the property is deleted
    onDelete: "CASCADE", // Delete all bookings associated with the property when the property is deleted
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
