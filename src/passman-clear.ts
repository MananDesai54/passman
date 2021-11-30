import { Command } from "commander";
import Configstore from "configstore";
import inquirer from "inquirer";
import "colors";

const program = new Command();

program.action(async () => {
  console.log("You can take backup of data by `passman backup`.".yellow);
  const input = await inquirer.prompt({
    type: "confirm",
    name: "isDelete",
    message: "Do you really want to clear all you stored data?".red,
    default: false,
  });
  if (input.isDelete) {
    const conf = new Configstore("passman");
    conf.clear();
    console.log("Your all data has been deleted!!".green);
    return;
  }
});

program.parse(process.argv);
