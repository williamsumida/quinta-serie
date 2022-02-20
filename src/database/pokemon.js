import { run, insert } from "./db";

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

export async function registerPokemonToPokedex(
  trainer,
  pokemon,
  pokemonRarity
) {
  const query = `
    INSERT INTO pokedex(pokemon_id, trainer_id, pokemon_rarity, catched_at)
    VALUES ($1, $2, $3, now());
  `;
  const data = [pokemon.id, trainer.id, pokemonRarity];

  try {
    await insert(query, data);
  } catch (error) {
    console.log(error);
  }
}
