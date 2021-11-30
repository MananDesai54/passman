import ConfigStore from "configstore";
import { decryptMessage, encryptMessage } from "../utils/cryptoAlgo.js";

// const ConfigStore = await eval('import("configstore")') as Promise<
//   typeof import("configstore")
// >;

export class KeyManager {
  private conf: ConfigStore;

  constructor() {
    this.conf = new ConfigStore("passman");
  }

  public setKey(keys: { encryptedKey: string; hashedKey: string }): boolean {
    try {
      this.conf.set("key", encryptMessage(JSON.stringify(keys), "mykey"));
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  public isKeySet(): boolean {
    return this.conf.get("key");
  }

  public getKey(type: "encrypted" | "hashed"): string {
    const key = this.conf.get("key");
    if (!key) {
      throw new Error(
        "No key found, please set one by using `passman key set`"
      );
    }
    const keys = JSON.parse(decryptMessage(key, "mykey"));
    return type === "hashed" ? keys.hashedKey : keys.encryptedKey;
  }
}
