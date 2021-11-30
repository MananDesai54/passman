import CryptoJS from "crypto-js";
import "colors";

export const encryptMessage = (
  message: string,
  encryptionKey: string
): string => CryptoJS.AES.encrypt(message, encryptionKey).toString();

export const decryptMessage = (
  encryptedText: string,
  encryptionKey: string
): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
  const unlockKey = bytes.toString(CryptoJS.enc.Utf8);

  if (!unlockKey) {
    throw new Error("Invalid Encryption Key!!".red);
  }

  return unlockKey;
};

export const hashMessage = (message: string): string =>
  CryptoJS.SHA256(message).toString();
