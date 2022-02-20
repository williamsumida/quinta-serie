/* eslint-disable prefer-destructuring */
import { run, insert } from "./db";

export async function getPokemonTrainer(user) {
  const { id } = user;
  const query = `
    SELECT *
    FROM pokemon_trainer
    WHERE id = ${id};
  `;

  const res = await run(query);
  let pokemonTrainer = null;

  if (res.length > 0) {
    pokemonTrainer = res[0];
  }

  return pokemonTrainer;
}

export async function createPokemonTrainer(user) {
  const query = `
    INSERT INTO pokemon_trainer(id, generation, last_time_captured)
    VALUES ($1, 1, now());
  `;
  const data = [user.id];
  try {
    await insert(query, data);
    console.log("created a new trainer");
  } catch (error) {
    console.log(error);
  }
}
