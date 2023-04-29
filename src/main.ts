import { MikroORM } from "@mikro-orm/core";
import type { SqliteDriver } from "@mikro-orm/sqlite";
import { Person } from "./entities/Person";
import ormConfig from "./mikro-orm.config";
import prompts from "prompts";

async function main() {
    let orm;
    try {
        orm = await MikroORM.init<SqliteDriver>(ormConfig);

        const migrator = orm.getMigrator();
        await migrator.up();

        // main application logic
        const response = await prompts([
            {
                type: "text",
                name: "firstName",
                message: "What is your first name ?",
            },
            {
                type: "text",
                name: "lastName",
                message: "What is your last name ?",
            },
        ]);

        await createPerson(orm, response.firstName, response.lastName);
    } finally {
        orm?.close();
    }
}

main().catch(console.error);

async function createPerson(
    orm: MikroORM<SqliteDriver>,
    firstName: string,
    lastName: string
) {
    const em = orm.em.fork();
    const personRepository = em.getRepository(Person);

    const p1 = personRepository.create({
        firstName: firstName,
        lastName: lastName,
    });

    await em.persistAndFlush(p1);
}
