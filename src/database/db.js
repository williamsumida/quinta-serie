// import { Client } from "pg";
import "dotenv/config";
import pg from "pg";
// const Client = pg.Client;
const { Client } = pg;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "pokemon",
  password: process.env.DB_PASSWORD,
};
function run(textQuery) {
  return new Promise((resolve, reject) => {
    const client = new Client(config);

    client.connect();

    client
      .query(textQuery, null)
      .then((res) => {
        client.end();
        resolve(res.rows);
      })
      .catch((error) => {
        client.end();
        reject(error);
      });
  });
}

export { run };
