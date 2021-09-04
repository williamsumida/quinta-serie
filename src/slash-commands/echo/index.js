import { SlashCommandBuilder } from "@discordjs/builders";

const command = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Sends a random gif!")
  .addStringOption((option) =>
    option
      .setName("category")
      .setDescription("The gif category")
      .setRequired(true)
      .addChoice("Funny", "gif_funny")
      .addChoice("Meme", "gif_meme")
      .addChoice("Movie", "gif_movie")
  );

export default command;
