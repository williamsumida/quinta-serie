/* eslint-disable prefer-destructuring */
import { run } from "./db";

export async function getPokemonTrainer(user) {
  const { id } = user;
  const query = `
    SELECT *
    FROM pokemon_trainer
    WHERE id = ${id};
  `;

  const res = await run(query);
  let pokemonTrainer = null;

  if (res.lenght > 0) {
    pokemonTrainer = res[0];
  }

  return pokemonTrainer;
}

export async function createPokemonTrainer(user) {}
