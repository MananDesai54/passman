#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0")
  .command(
    "key",
    "Set and reset key, Key will be used to unlock all credentials"
  )
  .command(
    "set",
    "Set credential for site, You can add site name, password and username. Username is optional."
  )
  .parse(process.argv);
