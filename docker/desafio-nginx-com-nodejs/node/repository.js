import mysql from "mysql";
import { promisify } from "node:util";

async function executeQuery(sql) {
  const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
  };

  const connection = mysql.createConnection(config);

  const queryPromise = promisify(connection.query.bind(connection));
  const result = await queryPromise(sql);

  connection.end();

  return result;
}

export async function createTable() {
  await executeQuery(
    "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))"
  );
}

export async function insertNewPerson(name) {
  await executeQuery(`INSERT INTO people (name) VALUES ('${name}')`);
}

export async function findAllPeople() {
  return await executeQuery("SELECT * FROM people");
}
