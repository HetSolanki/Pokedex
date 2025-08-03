import {
  commandHelp,
  commandExit,
  commandMapForward,
  commandMapBack,
  commandExplore,
  commandCatch,
  commandInspect,
  commandPokedex,
} from "./commands.js";
import { CLICommand } from "./states.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location_name>",
      description: "Explore a location",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "View details about a caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all the caughted pokemons",
      callback: commandPokedex,
    },
  };
}
