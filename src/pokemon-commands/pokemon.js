import { MessageEmbed } from "discord.js";
import { capitalize, generateRandomNumber } from "../helper-functions";
import {
  getPokemonById,
  getPokemonGeneration,
  registerPokemonToPokedex,
} from "../database/pokemon";

import {
  createPokemonTrainer,
  getPokemonTrainer,
} from "../database/pokemon-trainer";

function generateRandomId(generation) {
  if (generation === 1) {
    return generateRandomNumber(1, 150);
  }
  if (generation === 2) {
    return generateRandomId(1, 251);
  }
  if (generation === 3) {
    return generateRandomNumber(1, 386);
  }
  return generateRandomNumber(1, 150);
}

async function handlePokemonTrainer(user) {
  const pokemonTrainer = await getPokemonTrainer(user);
  if (!pokemonTrainer) {
    createPokemonTrainer(user);
  }
}

export default async function catchPokemon(interaction) {
  const { user } = interaction;

  const pokemonTrainer = handlePokemonTrainer(user);

  const pokemonGeneration = await getPokemonGeneration(pokemonTrainer);

  const pokemonId = await generateRandomId(pokemonGeneration);
  const pokemon = await getPokemonById(pokemonId);

  // register pokemon to pokedex
  // parse message

  const embed = new MessageEmbed()
    .setColor("#0099FF")
    .setDescription(
      `<@${user.id}>, you've caught a ${capitalize(pokemon.name)}!
       Type: ${pokemon.types}
       height: ${pokemon.height}
       weight: ${pokemon.weight}
      `
    )
    .setImage(pokemon.gif_url);

  await interaction.reply({ embeds: [embed] });
}
