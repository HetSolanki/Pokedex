import { startREPL } from "./repl.js";
import { initState } from "./states.js";

function main() {
  const state = initState(1000 * 60 * 5);
  startREPL(state);
}

main();
