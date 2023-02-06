# SERVER

## uu-SubjectMan

Unicorn Semestral Project

---

## Local Dependencies

Version of npm - `8.xx.xx`

Version of node - `16.xx.xx`

## Installation

### Local developing (localhost:4000)

1.  Rename `.env.example` to `.env`
2.  Run `$ npm i`
3.  `$ npm run serve`

## Access

**Local**

- (localhost) -> Port 4000
- Credentials:
  1.  AdminUser: **adminPassword**
  2.  SupervisorUser: **adminPassword**
  3.  SimpleUser: **userPassword**
- (localhost) -> Port 4000
- MongoDB Compass URI:
  - `mongodb://username:root@localhost:27017/`
- Insomnia / Postman
  - import data from `/server/Collections/`
  - create your own environment with that values :
  ```
  {
	"host": "localhost:4000",
	"jwtToken": "<COPY&PAST token from /login here>"
  }
  ```

## NPM

### Option 1

You can check the outdate packages with: `$ npm outdate`

Update all in once: `$ npm update`

Then `$ npm i packageName@versionNumber` to install specific version : example `$ npm i browser-sync@2.1.0.`

Or `$ npm i packageName@latest` to install latest version : example `$ npm i browser-sync@latest.`

### Option 2

Install `$ npm install -g npm-check-updates`

Then run `$ ncu -u`

And finally `$ npm install`

## Eslint & Prettier

- `$ npm run lint` - will be show you all errors
- `$ npm run lint:fix` - at first will be fixes errors and show you what you have to fix self
- `$ npm run format` - use Prettier for format files

### Eslint disable

- `/* eslint-disable <RULE_NAME> */`
- `/* eslint-enable <RULE_NAME> */`

  For example:

  - `/* eslint-disable camelcase */`
  - `/* eslint-enable camelcase */`

Or you can use that without **RULE_NAME**

---

# Know How

## Install Package

Before install new npm package check it per:

- `https://openbase.com`
- `https://snyk.io/advisor/`

With that step avoid **Dependency vulnerabilities** !

---

# Known Issues

## VSC disable JS/TS Language Features for VSC

`https://stackoverflow.com/questions/59860224/how-can-i-disable-initializing-js-ts-language-features-in-a-specific-project`

---

## Authors

- [Michal Durik](https://github.com/miko866)

## Copyright

&copy; Michal Durik
