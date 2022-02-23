import { SlashCommandBuilder } from '@discordjs/builders';

const command = new SlashCommandBuilder()
  .setName('pokemon')
  .setDescription('Capture a Pokemon');

export default command;
