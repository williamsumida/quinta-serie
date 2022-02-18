import { Client, Intents } from "discord.js";
import { catchPokemon } from "./slash-commands/pokemon-commands/pokemon/index.js";
import dotenv from "dotenv/config";

const { TOKEN, environment_type } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

console.log(Intents.FLAGS);

client.once("ready", () => {
  console.log("Quinta Serie BOT is Running!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "alo") {
    await interaction.reply("alo");
  } else if (commandName === "pokemon") {
    await catchPokemon(interaction);
  }
});

client.login(TOKEN);
