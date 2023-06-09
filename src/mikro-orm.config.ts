import { defineConfig } from "@mikro-orm/sqlite";
import { Person } from "./entities/Person";

export default defineConfig({
    entities: [Person],
    dbName: "data.db",
    type: "sqlite",
    debug: false,
    migrations: {
        path: "./migrations",
    },
});
