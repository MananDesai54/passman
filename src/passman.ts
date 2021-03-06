#!/usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import "colors";

const program = new Command();

figlet("passman", (error: Error | null, data: string | undefined) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(data?.blue);
});

program
  .version("1.0.0")
  .command("key", "Key will be used to unlock all credentials")
  .command(
    "cred",
    "Set credential for site, You can add site name, password and username. Username is optional."
  )
  .command("generate", "Generate secure password.")
  .command("clear", "Clear all the details you stored.")
  .command(
    "backup",
    "Backup you data, you data will be copied to clipboard then you can store it wherever you want"
  )
  .parse(process.argv);
