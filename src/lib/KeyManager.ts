import ConfigStore from "configstore";

export class KeyManager {
  private conf: ConfigStore;

  constructor() {
    this.conf = new ConfigStore("passman");
  }

  public setKey(key: string): boolean {
    try {
      this.conf.set("key", key);
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  public isKeySet(): boolean {
    return !!this.conf.get("key");
  }

  public getKey(): string {
    const key = this.conf.get("key");
    if (!key) {
      throw new Error(
        "No key found, please set one by using `passman key set`"
      );
    }
    return key;
  }

  public resetKey(): boolean {
    console.log("Think on how to reset");
    return true;
  }
}
