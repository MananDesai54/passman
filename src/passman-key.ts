import { Command } from "commander";
import { key } from "./commands/key.js";

const program = new Command();

program
  .command("set")
  .description(
    "Set key to unlock all credentials and it is required to be set. Key must strong. Ya I know that you are thinking that WTF I need to remember password to show my password, but it is for your safety my friend."
  )
  .action(key.setKey);

program
  .command("show")
  .description("To see the key but for that you need to give something")
  .action(key.showKey);

program
  .command("reset")
  .description("To reset the key but for that you need to give something")
  .action(key.resetKey);

program.parse(process.argv);
