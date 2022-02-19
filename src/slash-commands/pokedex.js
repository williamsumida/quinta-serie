import { SlashCommandBuilder } from "@discordjs/builders";

const command = new SlashCommandBuilder()
  .setName("pokedex")
  .setDescription("List all captured Pokemons");

export default command;
