import { SlashCommandBuilder } from "@discordjs/builders";
import pkg from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv/config";

import teste from "./teste/index.js";
import echo from "./echo/index.js";

const { TOKEN, clientId, guildId } = process.env;

const { REST } = pkg;

const commands = [teste, echo].map((command) => command.toJSON());

const rest = new REST({ version: 9 }).setToken(TOKEN);

async function deployCommands() {
  try {
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });
    console.log(commands)
    console.log("Successfully registered application commands (Production).");
  } catch (error) {
    console.error(error);
  }
}

async function deployCommandsDevelopment() {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands (Develoment).");
  } catch (error) {
    console.error(error);
  }
}

export { deployCommands, deployCommandsDevelopment };
