import "dotenv/config";
import { Client, Intents } from "discord.js";
import catchPokemon from "./pokemon-commands/pokemon";

const { TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

console.log(Intents.FLAGS);

client.once("ready", () => {
  console.log("Quinta Serie BOT is Running!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "pokemon") {
    await catchPokemon(interaction);
  } else if (commandName === "pokedex") {
    console.log("pokedex");
  }
});

client.login(TOKEN);
