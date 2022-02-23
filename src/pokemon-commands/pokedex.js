/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import 'dotenv/config';
import { MessageEmbed } from 'discord.js';

import { getPokemonTrainer } from '../database/pokemon-trainer';
import { getCaughtPokemons } from '../database/pokedex';

async function pokemonTrainerNotFoundMessage(interaction, user) {
  const embed = new MessageEmbed().setDescription(
    `@<${user.id}> has not caught a Pokemon yet.`
  );

  await interaction.editReply({ embeds: [embed] });
}

function parsePokedexMessage(caughtPokemons) {
  let message = 'Caught Pokemons:\n';

  for (const i in caughtPokemons) {
    message += `${caughtPokemons[i].name} ${caughtPokemons[i].count}x\n`;

    if (i > 20) {
      break;
    }
  }

  message += `Gen 1: ${caughtPokemons.length}/151\n`;
  message += `Gen 2: 0/100\n`;
  message += `Gen 3: 0/135`;
  return message;
}

async function sendPokedexMessage(interaction, message) {
  const embed = new MessageEmbed().setDescription(message);
  await interaction.editReply({ embeds: [embed] });
}

export default async function pokedex(interaction) {
  await interaction.deferReply();

  const { user } = interaction;
  const pokemonTrainer = await getPokemonTrainer(user);

  if (pokemonTrainer) {
    // show pokemons
    const caughtPokemons = await getCaughtPokemons(pokemonTrainer);
    const message = parsePokedexMessage(caughtPokemons);
    await sendPokedexMessage(interaction, message);
  } else {
    await pokemonTrainerNotFoundMessage(interaction, user);
  }
}
