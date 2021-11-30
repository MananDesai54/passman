export const isRequired = (input: string): string | boolean =>
  input === "" ? "Input is required, Please Enter" : true;
