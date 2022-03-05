from tkinter import W
import requests
import psycopg2
import pprint as pp
from dotenv import dotenv_values, load_dotenv


class Pokemon:
    def __init__(self) -> None:
        self.id = 0
        self.name = ""
        self.gif_url = ""
        self.gif_shiny_url = ""
        self.gif_special_url = ""
        self.height = ""
        self.weight = ""
        self.types = ""


def get_types(types):
    type_string = ""
    if types:
        for type in types:
            type_string += f'{type["type"]["name"]} '
        type_string = type_string.strip()
        type_string = type_string.replace(" ", "/")
    return type_string


def db_insert_pokemon(cursor, pkmn):
    sql = f"INSERT INTO pokemon (id, name, gif_url, gif_shiny_url, height, weight, types) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    pokemon_to_insert = (
        pkmn.id,
        pkmn.name,
        pkmn.gif_url,
        pkmn.gif_shiny_url,
        pkmn.height,
        pkmn.weight,
        pkmn.types,
    )

    cursor.execute(sql, pokemon_to_insert)


def main():
    url = "https://pokeapi.co/api/v2/pokemon"
    gen_1_id = 151
    config = dotenv_values(".env")
    pg_conn = psycopg2.connect(
        host=config["DB_HOST"],
        database="pokemon",
        user=config["DB_USER"],
        password=config["DB_PASSWORD"],
    )

    cursor = pg_conn.cursor()

    for i in range(1, gen_1_id):
        r = requests.get(f"{url}/{i}")
        pokemon_json = r.json()

        pokemon = Pokemon()

        pokemon.id = pokemon_json["id"]
        pokemon.name = pokemon_json["name"]
        pokemon.gif_url = f"https://projectpokemon.org/images/normal-sprite/{pokemon.name.replace('-', '_')}.gif"
        pokemon.gif_shiny_url = f"https://projectpokemon.org/images/shiny-sprite/{pokemon.name.replace('-', '_')}.gif"
        pokemon.gif_special_url = f""
        pokemon.height = pokemon_json["height"]
        pokemon.weight = pokemon_json["weight"]
        pokemon.types = get_types(pokemon_json["types"])

        db_insert_pokemon(cursor, pokemon)

    pg_conn.commit()


main()
