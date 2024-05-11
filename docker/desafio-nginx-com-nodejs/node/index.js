import express from "express";
import {
  createTable,
  insertNewRandomPerson,
  findAllPeople,
} from "./repository.js";

function buildPeopleList(people) {
  const list = `
  <ul>
  ${people.map((person) => `<li>${person.name}</li>`).join("")}
  </ul>
  `;

  return list;
}

const app = express();
const port = 3000;

app.get("/", async (_, res) => {
  await insertNewRandomPerson();

  const title = "<h1>Full Cycle Rocks!</h1>";

  const people = await findAllPeople();
  const list = buildPeopleList(people);

  const response = `${title}${list}`;
  res.send(response);
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await createTable();
});
