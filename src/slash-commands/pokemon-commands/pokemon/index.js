import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { run } from "../../../db.js";

const command = new SlashCommandBuilder()
  .setName("pokemon")
  .setDescription("Capture a Pokemon");

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomId(generation) {
  if (generation === 1) {
    return generateRandomNumber(1, 150);
  }
}

function getPokemonGeneration(user) {
  return 1;
}

async function getPokemonById(id) {
  const query = `
    SELECT *
    FROM pokemon        
    WHERE id = '${id}';
  `;

  const res = await run(query).then((result) => {
    if (result) {
      return result[0];
    }
  });

  return res;
}

async function catchPokemon(interaction) {
  const { user } = interaction;

  const pokemonGeneration = getPokemonGeneration(user);

  const pokemonId = generateRandomId(pokemonGeneration);

  // get pokemon
  const pokemon = await getPokemonById(pokemonId);
  console.log(pokemon);

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

export default command;
export { catchPokemon };
