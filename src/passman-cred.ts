import { Command } from "commander";
import { cred } from "./commands/cred.js";

const program = new Command();

program
  .command("add")
  .description("Add credential for an account")
  .action(cred.add);

program
  .command("show")
  .description("See credential for one or all account")
  .option(
    "--host <hostname>",
    "Get credential by `hostname in CSV` format or use `all` to get all"
  )
  .action((cmd) => cred.show(cmd));

program
  .command("update")
  .description("Update credential for an account")
  .action(cred.update);

program
  .command("remove")
  .description("Remove one or all credentials")
  .action(cred.remove);

program.parse(process.argv);
