# What is Passman?

- Well it's password manager CLI app that I made for myself as I was tired of remembering and resetting passwords.
- All the credential you add will be encrypted and stored in you system
- And yes If you find any bug or need any feature do create a issue or make a PR with update.
- Well you can also use it for yourself by following below details.

# How to use it?

- Well You need `Nodejs` and 'Yarn'

```sh
yarn install
yarn compile # to compile typescript in javascript

# You need to run `passman` as a global command run we need to create symbolic link to your code with global node folder
# to do this run
sudo npm link # for linux and mac
npm link # for windows

passman -h # see the help and do accordingly

# If by any chance it shows `passman command not found` then you can use it by this command also
yarn start -h # instead of passman use `yarn start`
```
