import { Command } from "commander";
import { CredManager } from "./lib/CredManager.js";
import { KeyManager } from "./lib/KeyManager.js";
import "colors";
import clipboard from "clipboardy";

const program = new Command();

program.action(() => {
  const credManager = new CredManager();
  const keyManager = new KeyManager();
  const credList = credManager.getCred([], keyManager.getKey("hashed"), true);
  clipboard
    .write(JSON.stringify(credList, null, 2))
    .then(() =>
      console.log("Your data has been copied to your clipboard!!".green)
    )
    .catch((error) => console.log(error.message.red));
});

program.parse(process.argv);
