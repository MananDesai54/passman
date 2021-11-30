import { KeyManager } from "../lib/KeyManager.js";
import { CredManager } from "../lib/CredManager.js";
import "colors";

export const isRequired = (input: string): string | boolean =>
  input === "" ? "Input is required, Please Enter" : true;

export const securityCheckForKey = (): void => {
  const keyManager = new KeyManager();
  const credManager = new CredManager();
  if (!keyManager.isKeySet()) {
    if (credManager.isCredExists()) {
      throw new Error(
        "Someone modified the  file where credentials are stored, Please reset all the credential by using `passman clear` as file is corrupted".red
      );
    }
    throw new Error(
      "You haven't set Unlock key, set using `passman key set`".red
    );
  }
};

// if (!keyManager.isKeySet()) {
//   if (credManager.isCredExists()) {
//     console.log(
//       "Someone modified the  file where credentials are stored, Please reset all the credential by using `passman clear` as file is corrupted"
//         .red
//     );
//   }
//   console.log("Please set key first by `passman key set`".red);
//   return;
// }
