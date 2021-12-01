# What is Passman?

- Well it's password manager CLI app that I made for myself as I was tired of remembering and resetting passwords.
- All the credential you add will be encrypted and stored in you system
- And yes If you find any bug or need any feature do create a issue or make a PR with update.
- Well you can also use it for yourself by following below details.

# How to use it?

## Download as a global npm package

```sh
yarn global add passman # for yarn
npm i -g passman # for npm
```

## Set up from scratch

- clone the repo
- Well You need `Nodejs` and 'Yarn'

```sh
1. yarn install
2. yarn compile # to compile typescript in javascript

# You need to run `passman` as a global command run we need to create symbolic link to your code with global node folder
# to do this run
3a. sudo npm link # for linux and mac
3b. npm link # for windows

# if linking not work by any way then no worry go to 4b below

4a. passman -h # see the help and do accordingly
# If by any chance it shows `passman command not found` then you can use it by this command also
4b. yarn start -h # instead of passman use `yarn start`
```

# Features

- Everything will be stored in your your **local machine**.
- All your data will be stored **Encrypted**.
- Set Unlock Key and Encryption Key
- Unlock Key will be used every time you want to CRUD your credentials.
- Encryption Key will be used to Reset your Unlock Key, incase you forgot it.
- CRUD Credentials
- Generate Strong password
- Backup all the Credentials you stored
- There will be more run `passman -h`

# Note

- There is some redundant code.
