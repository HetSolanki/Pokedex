import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { getCommands } from "./registery.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  r1: Interface;
  registery: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(): State {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    r1,
    registery: getCommands(),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
