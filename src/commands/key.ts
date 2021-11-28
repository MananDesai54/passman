import { KeyManager } from "../lib/KeyManager";
import inquirer from "inquirer";
import "colors";
import { enc, AES } from "crypto-js";

export const key = {
  async setKey(): Promise<void> {
    console.log(
      "Now you will be asked to enter two type of keys: Encryption key and Unlock key. Encryption key will be used to encrypt you data, you can use it to decrypt you data. Unlock key will be used whenever you ask to get credential of any data. I you forget Unlock key then you can reset it by using Encryption key but if you forget both then there is no way to get your data back."
        .red
    );
    console.log();
    console.log();
    const keyManager = new KeyManager();
    const encryptionKey = await inquirer.prompt([
      {
        type: "input",
        name: "encryptionKey",
        message:
          "Enter Encryption key (Do remember this and note it some where)"
            .green,
      },
    ]);
    const unlockKey = await inquirer.prompt([
      {
        type: "password",
        name: "unlockKey",
        message: "Enter Unlock key".green,
      },
    ]);
    const encryptedUnlockKey = AES.encrypt(unlockKey, encryptionKey).toString();
    keyManager.setKey(encryptedUnlockKey);
  },
  async showKey(): Promise<void> {
    const keyManger = new KeyManager();
    const encryptionKey = await inquirer.prompt([
      {
        type: "password",
        name: "encryptionKey",
        message: "Enter Encryption key to see the Unlock key".green,
      },
    ]);

    const bytes = AES.decrypt(keyManger.getKey(), encryptionKey);
    const unlockKey = bytes.toString(enc.Utf8);

    if (!unlockKey) {
      console.log("Invalid Encryption key!!!!".red);
      return;
    }
    console.log(
      "Great, You remember the encryption key !! Your Unlock key is copied to your clipboard."
        .green
    );
  },
  resetKey(): void {
    console.log("Hello from reset key");
  },
  isKeySet(): boolean {
    const keyManager = new KeyManager();
    return keyManager.isKeySet();
  },
};
