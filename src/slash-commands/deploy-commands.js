import dotenv from "dotenv/config";
import { SlashCommandBuilder } from "@discordjs/builders";
import pkg from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import pokemon from "./pokemon-commands/pokemon/index.js";

const { TOKEN, clientId, guildId, guildIdQuintaSerie } = process.env;

const { REST } = pkg;

const commands = [pokemon].map((command) => command.toJSON());

const rest = new REST({ version: 9 }).setToken(TOKEN);

async function deployCommands() {
  try {
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildIdQuintaSerie),
      {
        body: commands,
      }
    );

    console.log(commands);
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
