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

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  url!: string;

  @ManyToOne(() => Property, (property) => property.images, {
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
