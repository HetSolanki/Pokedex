import { startREPL } from "./repl.js";
import { initState } from "./states.js";

function main() {
  const state = initState();
  startREPL(state);
}

main();
