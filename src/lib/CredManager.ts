import Configstore from "configstore";
import "colors";
import { decryptMessage, encryptMessage } from "../utils/cryptoAlgo.js";

export interface Credential {
  host: string;
  password: string;
  username?: string;
  updatedDate: string;
}

export class CredManager {
  private conf: Configstore;

  constructor() {
    this.conf = new Configstore("passman");
  }

  addCred(credential: Credential, encryptionKey: string): boolean {
    let credList: Array<Credential> = JSON.parse(
      this.conf.get("credentials")
        ? decryptMessage(this.conf.get("credentials"), encryptionKey)
        : "[]"
    );
    try {
      credList.push(credential);
      this.conf.set(
        "credentials",
        encryptMessage(JSON.stringify(credList), encryptionKey)
      );
      return true;
    } catch (error) {
      console.log(error.message.red);
      return false;
    }
  }

  isCredExists(): boolean {
    return !!this.conf.get("credentials");
  }

  getCred(hosts: string[], encryptionKey: string, all = false): Credential[] {
    const encryptedCredList = this.conf.get("credentials");
    if (!encryptedCredList) {
      throw new Error(
        "You haven't set any credential yet use `passman cred set` to set one"
      );
    }
    const credList: Array<Credential> = JSON.parse(
      decryptMessage(encryptedCredList, encryptionKey)
    );
    const credentials: Credential[] = [];
    if (all) {
      return credList;
    }
    hosts.forEach((host) => {
      credentials.push(...credList.filter((cred) => cred.host.includes(host)));
    });
    return credentials;
  }

  updateCred(
    credential: Credential,
    encryptionKey: string,
    remove = false
  ): boolean {
    const encryptedCredList = this.conf.get("credentials");
    if (!encryptedCredList) {
      throw new Error(
        "You haven't set any credential yet use `passman cred set` to set one"
      );
    }
    try {
      let credList: Array<Credential> = JSON.parse(
        decryptMessage(encryptedCredList, encryptionKey)
      );
      if (remove) {
        credList = credList.filter(
          (cred) => !cred.host.includes(credential.host)
        );
      } else {
        credList = credList.map((cred) =>
          cred.host.includes(credential.host) ? credential : cred
        );
      }
      this.conf.set(
        "credentials",
        encryptMessage(JSON.stringify(credList), encryptionKey)
      );
      return true;
    } catch (error) {
      console.log(error.message.red);
      return false;
    }
  }

  updateEncryption(oldEncryptionKey: string, encryptionKey: string): void {
    let encryptedCredList = this.conf.get("credentials");
    if (!encryptedCredList) {
      console.log(
        "You haven't set any credential yet use `passman cred set` to set one"
          .red
      );
      return;
    }
    const credList: Array<Credential> = JSON.parse(
      decryptMessage(encryptedCredList, oldEncryptionKey)
    );
    this.conf.set(
      "credentials",
      encryptMessage(JSON.stringify(credList), encryptionKey)
    );
  }
}
