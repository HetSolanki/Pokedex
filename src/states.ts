import { createInterface, type Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { getCommands } from "./registery.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  r1: Interface;
  registery: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  catch: Record<string, Pokemon>;
};

export function initState(cacheInterval: number): State {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    r1,
    registery: getCommands(),
    pokeAPI: new PokeAPI(cacheInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
    catch: {},
  };
}
