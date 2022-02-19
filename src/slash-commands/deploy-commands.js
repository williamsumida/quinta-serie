import "dotenv/config";
import pkg from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import pokemonCommand from "./pokemon";

const { TOKEN, clientId, guildId, guildIdQuintaSerie } = process.env;

const { REST } = pkg;

const commands = [pokemonCommand].map((command) => command.toJSON());

const rest = new REST({ version: 9 }).setToken(TOKEN);

export async function deployCommands() {
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

export async function deployCommandsDevelopment() {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands (Develoment).");
  } catch (error) {
    console.error(error);
  }
}
