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

export async function commandCatch(state: State, ...args: string[]) {
  if (!args[0]) throw new Error("Provide valid pokemon name");
  if (state.catch[args[0]])
    throw new Error(`${args[0]} is already caught by the hulk!`);

  console.log(`Throwing a Pokeball at ${args[0]}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(args[0]);

  if (!pokemon) throw new Error("No pokemon found!");

  let isCaught =
    Math.random() * pokemon.base_experience > pokemon.base_experience / 2;
  if (isCaught) {
    console.log(`${args[0]} was caught!`);
    state.catch[pokemon.name] = pokemon;
  } else {
    console.log(`${args[0]} escaped!`);
  }
}

export async function commandInspect(state: State, ...args: string[]) {
  if (!args[0]) throw new Error("Enter valid pokemon name");

  const pokemon = state.catch[args[0]];
  if (!pokemon) throw new Error("you have not caught that pokemon");

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log(`Stats:`);
  for (const state of pokemon.stats) {
    console.log(` -${state.stat.name}: ${state.base_stat}`);
  }
  console.log(`Types:`);
  for (const type of pokemon.types) {
    console.log(` - ${type.type.name}`);
  }
}

export async function commandPokedex(state: State) {
  if (Object.keys(state.catch).length === 0)
    throw new Error("Your pokedex is empty!");

  console.log("Your Pokedex:");
  for (const key in state.catch) {
    console.log(` - ${state.catch[key].name}`);
  }
}
