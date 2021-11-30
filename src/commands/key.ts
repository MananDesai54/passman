import "colors";
import inquirer from "inquirer";
import { KeyManager } from "../lib/KeyManager.js";
import { CredManager } from "../lib/CredManager.js";
import { isRequired } from "../utils/validation.js";
import {
  decryptMessage,
  encryptMessage,
  hashMessage,
} from "../utils/cryptoAlgo.js";
import clipboardy from "clipboardy";

export const key = {
  setKey: async (): Promise<void> => {
    console.log();
    const keyManager = new KeyManager();
    if (keyManager.isKeySet()) {
      console.log(
        "You had already set the key. If you want to reset then run `passman key reset`"
          .yellow
      );
      return;
    }
    console.log(
      `Note:
      Now you will be asked to enter two type of keys: Encryption key and Unlock key. Encryption key will be needed if you want to reset your unlock key. Unlock key will be needed whenever you ask to get, set, update or delete credential. If you forget Unlock key then you can reset it by using Encryption key but if you forget both then there is no way to get your data back. So at least remember you Encryption key`
        .red
    );
    console.log();
    const input = await inquirer.prompt([
      {
        type: "password",
        name: "encryptionKey",
        message:
          "Enter Encryption key (Do remember this and note it some where)"
            .green,
        validate: isRequired,
      },
      {
        type: "password",
        name: "unlockKey",
        message: "Enter Unlock key".green,
        validate: isRequired,
      },
    ]);
    const hashedUnlockKey = hashMessage(input.unlockKey);
    const encryptedUnlockKey = encryptMessage(
      input.unlockKey,
      input.encryptionKey
    );
    keyManager.setKey({
      hashedKey: hashedUnlockKey,
      encryptedKey: encryptedUnlockKey,
    });
    console.log("You successfully set the Unlock and Encryption keys!!".green);
  },
  async showKey(): Promise<void> {
    console.log();
    const keyManger = new KeyManager();
    if (!keyManger.isKeySet()) {
      console.log(
        "You haven't set Unlock key, set using `passman key set`".red
      );
      return;
    }
    const input = await inquirer.prompt([
      {
        type: "password",
        name: "encryptionKey",
        message: "Enter Encryption key to see the Unlock key".green,
        validate: isRequired,
      },
    ]);
    try {
      const unlockKey = decryptMessage(
        keyManger.getKey("encrypted"),
        input.encryptionKey
      );

      if (!unlockKey) {
        console.log("Invalid Encryption key!!!!".red);
        return;
      }
      await clipboardy.write(unlockKey);
      console.log(
        "\nSuccess!! Your Unlock key  has been copied to your clipboard.".green
      );
    } catch (error) {
      console.log(error.message.red);
    }
  },
  resetKey: async (): Promise<void> => {
    console.log();
    const keyManger = new KeyManager();
    if (!keyManger.isKeySet()) {
      console.log(
        "You haven't set Unlock key, set using `passman key set`".red
      );
      return;
    }
    try {
      const input2 = await inquirer.prompt([
        {
          type: "password",
          name: "encryptionKey",
          message: "Enter Encryption Key".green,
          validate: isRequired,
        },
      ]);
      // verify encryption key is valid or not
      decryptMessage(keyManger.getKey("encrypted"), input2.encryptionKey);
      const resetInputs = await inquirer.prompt([
        {
          type: "password",
          name: "passwd",
          message: "Enter new Unlock Key".green,
          validate: isRequired,
        },
        {
          type: "password",
          name: "rePasswd",
          message: "re-enter new Unlock Key".green,
          validate: isRequired,
        },
      ]);
      if (resetInputs.passwd !== resetInputs.rePasswd) {
        throw new Error("Both keys need to be same!!");
      }
      const newUnlockKey = encryptMessage(
        resetInputs.passwd,
        input2.encryptionKey
      );
      const hashedNewUnlockKey = hashMessage(resetInputs.passwd);
      const credManager = new CredManager();
      if (credManager.isCredExists()) {
        credManager.updateEncryption(
          keyManger.getKey("hashed"),
          hashedNewUnlockKey
        );
      }
      keyManger.setKey({
        encryptedKey: newUnlockKey,
        hashedKey: hashedNewUnlockKey,
      });
      console.log("Success!! Your Unlock key has been updated.".green);
    } catch (error) {
      console.log(error.message.red);
    }
  },
  verifyKey: async (): Promise<boolean> => {
    const input = await inquirer.prompt([
      {
        type: "password",
        name: "unlockKey",
        message: "Enter you passman unlock key".green,
        validate: isRequired,
      },
    ]);
    const hashedUnlockKey = hashMessage(input.unlockKey);
    const keyManager = new KeyManager();
    return hashedUnlockKey === keyManager.getKey("hashed");
  },
};
