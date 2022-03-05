import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import catchPokemon from './pokemon-commands/pokemon';
import pokedex from './pokemon-commands/pokedex';

const { TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

console.log(Intents.FLAGS);

client.once('ready', () => {
  console.log('Quinta Serie BOT is Running!');
});

const cooldown = new Set();
const cooldownTime = 5000;

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'pokemon') {
    if (cooldown.has(interaction.user.id)) {
      interaction.reply({
        content: 'Please wait for the cooldown to end',
        ephemeral: true,
      });
    } else {
      cooldown.add(interaction.user.id);
      await catchPokemon(interaction);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    }
  } else if (commandName === 'pokedex') {
    await pokedex(interaction);
  }
});

client.login(TOKEN);
