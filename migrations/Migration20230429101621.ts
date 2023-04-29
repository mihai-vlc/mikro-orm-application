import { Migration } from "@mikro-orm/migrations";

export class Migration20230429101621 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            "create table `person` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `first_name` text not null, `last_name` text not null);"
        );
    }
}
