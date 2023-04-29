import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey()
    id!: number;

    @Property({ onCreate: () => new Date() })
    createdAt?: Date = new Date();

    @Property({
        onCreate: () => new Date(),
        onUpdate: () => new Date(),
    })
    updatedAt?: Date = new Date();
}
