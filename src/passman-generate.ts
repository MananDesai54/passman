import { Command } from "commander";
import "colors";
import clipboard from "clipboardy";

const program = new Command();

program
  .option("--length <number>", "Specify length between 8-16. Default is 12")
  .action(async (cmd) => {
    if (+cmd.length < 8 || +cmd.length > 16) {
      console.log("Specify Length between 8-16 or leave it to us".red);
      return;
    }
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = +cmd.length || 12;
    let password: string = "";
    for (let i = 0; i < length; i++) {
      password = password.concat(
        characters[Math.floor(Math.random() * characters.length)]
      );
    }
    try {
      await clipboard.write(password);
      console.log(
        `You generated password is ${password} and it has been copied to your clipboard`
          .green
      );
    } catch (error) {
      console.log(error.message.red);
    }
  });

program.parse(process.argv);
