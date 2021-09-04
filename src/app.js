import { Client, Intents } from "discord.js";
// import {
//   deployCommands,
//   deployCommandsDevelopment,
// } from "./slash-commands/deploy-commands.js";

import dotenv from "dotenv/config";
const { TOKEN, environment_type } = process.env;

// if (environment_type === "production") deployCommands();
// else deployCommandsDevelopment();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

console.log(Intents.FLAGS);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  console.log(interaction);

  if (commandName === "alo") {
    await interaction.reply("teste!");
  } else if (commandName === "echo") {
    await interaction.reply("echo");
  }
});

client.login(TOKEN);
