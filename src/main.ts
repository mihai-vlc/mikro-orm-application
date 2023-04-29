import { MikroORM } from "@mikro-orm/core";
import type { SqliteDriver } from "@mikro-orm/sqlite";
import { Person } from "./entities/Person";
import ormConfig from "./mikro-orm.config";

async function main() {
    let orm;
    try {
        orm = await MikroORM.init<SqliteDriver>(ormConfig);

        const migrator = orm.getMigrator();
        await migrator.up();

        await createPerson(orm);

        console.log(add(4, 7));
    } finally {
        orm?.close();
    }
}

main().catch(console.error);

async function createPerson(orm: MikroORM<SqliteDriver>) {
    const em = orm.em.fork();
    const personRepository = em.getRepository(Person);

    const p1 = personRepository.create({
        firstName: "mihai",
        lastName: "mihai",
    });

    await em.persistAndFlush(p1);
}

function add(a: number, b: number) {
    return a + b;
}
