import { run } from './db';

export async function getCaughtPokemons(pokemonTrainer) {
  const query = `
    SELECT name, count(name)
    FROM pokedex
    INNER JOIN pokemon ON pokemon_id=id
    WHERE trainer_id = ${pokemonTrainer.id}
    GROUP BY NAME;
  `;
  const res = await run(query);
  return res;
}

export async function d() {
  console.log('d');
}
