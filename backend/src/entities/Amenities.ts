import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "./Property";

@Entity("amenities")
export class Amenities {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  key!: string;

  @Column({ default: false })
  value!: boolean;

  @ManyToOne(() => Property, (property) => property.amenities, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "propertyId" })
  property!: Property;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
