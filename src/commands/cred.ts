import { CredManager, Credential } from "../lib/CredManager.js";
import { KeyManager } from "../lib/KeyManager.js";
import "colors";
import inquirer from "inquirer";
import { isRequired, securityCheckForKey } from "../utils/validation.js";
import { key } from "./key.js";

export const cred = {
  add: async (): Promise<void> => {
    const credManager = new CredManager();
    const keyManager = new KeyManager();
    if (!keyManager.isKeySet()) {
      if (credManager.isCredExists()) {
        console.log(
          "Someone modified the  file where credentials are stored, Please reset all the credential by using `passman clear` as file is corrupted"
            .red
        );
      }
      console.log("Please set key first by `passman key set`".red);
      return;
    }

    const isKeyValid = await key.verifyKey();

    if (isKeyValid) {
      try {
        const input = await inquirer.prompt([
          {
            type: "input",
            name: "host",
            message: "Enter Host/Website/App name".green,
            validate: isRequired,
          },
          {
            type: "password",
            name: "password",
            message: "Enter password".green,
            validate: isRequired,
          },
          {
            type: "input",
            name: "username",
            message: "Enter Username (optional)".green,
          },
        ]);
        const credential: Credential = {
          host: input.host,
          password: input.password,
          updatedDate: Date.now().toString(),
          username: input.username,
        };

        const isAdded = credManager.addCred(
          credential,
          keyManager.getKey("hashed")
        );

        if (isAdded) {
          console.log(
            "Your credential has been added, use `passman cred get --cred=HOST_NAME` to get your credential"
              .green
          );
        } else {
          console.log("Failed to add credential, please try again".red);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      console.log("Invalid Unlock key!!!".red);
      return;
    }
  },
  show: async (cmd: any): Promise<void> => {
    if (!cmd.host && !cmd.all) {
      console.log("Please provide host by passing --host=HOST_NAME".red);
      return;
    }
    const credManager = new CredManager();
    const keyManager = new KeyManager();
    try {
      securityCheckForKey();
      const isKeyValid = await key.verifyKey();
      if (isKeyValid) {
        const credential = credManager.getCred(
          [...(cmd.host?.split(",") || [])],
          keyManager.getKey("hashed"),
          cmd.all
        );
        if (credential.length === 0) {
          console.log("No credential with the host you provided!!".red);
          return;
        }
        console.log(credential);
      } else {
        console.log("Invalid Unlock key".red);
        return;
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
  update: async (cmd: any): Promise<void> => {
    if (!cmd.host) {
      console.log("Please provide host by passing --host=HOST_NAME".red);
      return;
    }
    const credManager = new CredManager();
    const keyManager = new KeyManager();
    try {
      securityCheckForKey();
      const isKeyValid = await key.verifyKey();
      if (isKeyValid) {
        const credential = credManager.getCred(
          [cmd.host],
          keyManager.getKey("hashed")
        );
        if (credential.length === 0) {
          console.log("No credential with the host you provided!!".red);
          return;
        }
        const input = await inquirer.prompt([
          {
            type: "input",
            name: "host",
            message: "Enter Host/Website/App name".green,
            validate: isRequired,
            default: credential[0].host,
          },
          {
            type: "input",
            name: "password",
            message: "Enter password".green,
            validate: isRequired,
            default: credential[0].password,
          },
          {
            type: "input",
            name: "username",
            message: "Enter Username (optional)".green,
            default: credential[0]?.username,
          },
        ]);
        const newCredential = {
          host: input.host,
          password: input.password,
          updatedDate: Date.now().toString(),
          username: input.username,
        };
        const isUpdated = credManager.updateCred(
          newCredential,
          keyManager.getKey("hashed")
        );
        if (isUpdated) {
          console.log("Credential Updated!!".green);
        }
      } else {
        console.log("Invalid Unlock key".red);
        return;
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
  remove: async (cmd: any): Promise<void> => {
    if (!cmd.host) {
      console.log("Please provide host by passing --host=HOST_NAME".red);
      return;
    }
    const credManager = new CredManager();
    const keyManager = new KeyManager();
    try {
      securityCheckForKey();
      const isKeyValid = await key.verifyKey();
      if (isKeyValid) {
        const credential = credManager.getCred(
          [cmd.host],
          keyManager.getKey("hashed")
        );
        if (credential.length === 0) {
          console.log("No credential with the host you provided!!".red);
          return;
        }
        const isDeleted = credManager.updateCred(
          credential[0],
          keyManager.getKey("hashed"),
          true
        );
        if (isDeleted) {
          console.log("Credential deleted!!".green);
        }
      } else {
        console.log("Invalid Unlock key".red);
        return;
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
};
