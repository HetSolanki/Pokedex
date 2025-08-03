import { State } from "./states.js";

export async function commandExit(state: State) {
  const { r1 } = state;
  console.log("Closing the Pokedex... Goodbye!");
  r1.close();
  process.exit(0);
}

export async function commandHelp(state: State) {
  const { registery } = state;
  let usage = `Welcome to the Pokedex!
Usage: \n`;
  for (const key in registery) {
    usage += `\n- ${registery[key].name}: ${registery[key].description}`;
  }
  console.log(usage);
}

export async function commandMapForward(state: State) {
  const response = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  state.nextLocationsURL = response.next;
  state.prevLocationsURL = response.previous;
  for (const result of response.results) {
    console.log(result.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }
  const response = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = response.next;
  state.prevLocationsURL = response.previous;
  for (const result of response.results) {
    console.log(result.name);
  }
}

export async function commandExplore(state: State, ...args: string[]) {
  if (!args[0]) throw new Error("Enter valida location-area name");
  console.log(`Exploring ${args[0]}`);
  const response = await state.pokeAPI.fetchLocation(args[0]);
  if (response) {
    console.log("Found Pokemon:");
    for (const pokemon of response.pokemon_encounters) {
      console.log(`- ${pokemon.pokemon.name}`);
    }
  } else {
    throw new Error("No Pokemon found.");
  }
}
