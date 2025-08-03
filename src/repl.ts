import { State } from "./states.js";

export function cleanInput(input: string): string[] {
  const parsedInput = input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
  return parsedInput;
}

export function startREPL(state: State) {
  const { r1, registery } = state;
  r1.on("line", async (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      r1.prompt();
      return;
    }

    const [commandName, ...args] = words;
    try {
      if (registery[commandName]) {
        await registery[commandName].callback(state, ...args);
      } else {
        console.log("Unknown command. Try 'help' for list of commands.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(`Unknown error occured: ${err}`);
      }
    }

    r1.prompt();
  });

  r1.prompt();
}
