/* eslint-disable camelcase */
import "dotenv/config";
import { MessageEmbed } from "discord.js";
import {
  capitalize,
  generateRandomNumber,
  getWaitTimeInSeconds,
  parseHoursMinutesSeconds,
} from "../helper-functions";

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
  let pokemonTrainer = await getPokemonTrainer(user);

  if (!pokemonTrainer) {
    await createPokemonTrainer(user);
    pokemonTrainer = await getPokemonTrainer(user);
  }

  return pokemonTrainer;
}

function isPokeballAvailable(waitTimeInSeconds) {
  const cooldown = process.env.CATCH_COOLDOWN_IN_MINUTES;
  if (waitTimeInSeconds / 60 >= cooldown || waitTimeInSeconds <= 5) {
    return true;
  }

  return false;
}

async function sendPokemonMessage(interaction, pokemonTrainer, pokemon) {
  const embed = new MessageEmbed()
    .setColor("#0099FF")
    .setDescription(
      `<@${pokemonTrainer.id}>, you've caught a **${capitalize(pokemon.name)}**!
       Type: ${pokemon.types}
       Height: ${pokemon.height}
       Weight: ${pokemon.weight}
      `
    )
    .setImage(pokemon.gif_url);

  await interaction.editReply({ embeds: [embed] });
}

async function sendCooldownMessage(interaction, user, waitTimeInSeconds) {
  const time = parseHoursMinutesSeconds(waitTimeInSeconds);
  let hours = "";
  let minutes = "";
  let seconds = "";

  if (time.hours !== 0) {
    hours = `${time.hours} hours `;
  }

  if (time.minutes !== 0) {
    minutes = `${time.minutes} minutes `;
  }

  if (time.seconds !== 0) {
    seconds = `${time.seconds} seconds`;
  }

  const parsedWaitTime = hours + minutes + seconds;
  await interaction.editReply(
    `<@${user.id}> you need to wait another **${parsedWaitTime}** before catching another pokemon.`
  );
}

export default async function catchPokemon(interaction) {
  await interaction.deferReply();
  const { user } = interaction;

  const pokemonTrainer = await handlePokemonTrainer(user);

  // check if trainer can capture a new pokemon
  const waitTimeInSeconds = getWaitTimeInSeconds(pokemonTrainer) - 3;
  if (isPokeballAvailable(waitTimeInSeconds)) {
    const pokemonGeneration = await getPokemonGeneration(pokemonTrainer);

    const pokemonId = await generateRandomId(pokemonGeneration);
    const pokemon = await getPokemonById(pokemonId);
    const pokemonRarity = "common";
    await registerPokemonToPokedex(pokemonTrainer, pokemon, pokemonRarity);
    await sendPokemonMessage(interaction, pokemonTrainer, pokemon);
  } else {
    await sendCooldownMessage(interaction, user, waitTimeInSeconds);
  }
}
