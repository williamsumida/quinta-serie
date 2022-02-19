import { run } from "./db";

export async function getPokemonById(id) {
  const query = `
    SELECT *
    FROM pokemon        
    WHERE id = '${id}';
  `;
  const res = await run(query).then((result) => {
    if (result) {
      return result[0];
    }
    return null;
  });
  return res;
}

export async function getPokemonGeneration(pokemonTrainer) {
  return 1;
}

export async function registerPokemonToPokedex(user, pokemon) {}
