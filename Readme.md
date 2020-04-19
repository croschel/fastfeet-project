<h1 align="center">
    <img alt="DevRadar" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="250px" />
</h1>

<h4 align="center">
  🚀 Fake Aplication created for Final Challenge on BootCamp 10 / Rocketseat
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/croschel/fastFeet">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/helderavila/fastfeet">

  <a href="https://github.com/croschel/fastFeet/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/croschel/fastFeet">
  </a>

  <a href="https://github.com/helderavila/fastfeet/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/croschel/fastFeet">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#tecnologies">Tecnologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-BackEnd">BackEnd</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#front-End-Web">Front-End-Web</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#mobile-App">Mobile-App</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-Contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">Licença</a>
</p>

<br>
<strong>Links to the system:</strong>

- [Back-end](https://github.com/croschel/fastfeet-project/tree/master/backend)
- [Front-end-web](https://github.com/croschel/fastfeet-project/tree/master/web)
- [App-Mobile](https://github.com/croschel/fastfeet-project/tree/master/fastfeetmobile)

## Tecnologies

This project was made with this tecnologies:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Express](https://github.com/expressjs/express)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)

## Project

FastFeet is an Application for a Fake Logistic Company that has some problems about management of your delivery system. Because of it this App was created to them for helping about this escpecif point

## Requirements
- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/pt-br/download/)
- [Yarn](https://yarnpkg.com/cli/install)
- [JDK 8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
- [Genymotion](https://www.genymotion.com/fun-zone/) If you are not with your Android

**Clone the repository**

## BackEnd

- Enter on backend folder from main;
- Run `yarn` to install de dependencies;
- Edit .env.example file with your data;
- with Docker create three databases:
  - postgres;
  - mongoDb;
  - redis;
- Run `yarn sequelize db:migrate` to create tables for your databases;
- Run `yarn sequelize db:seed:all`;
- Run `yarn backEnd` to start;

## Front-End-Web

- Before run front-end server remember to start backend first;
- Run `yarn` to install de dependencies;
- Run `yarn start` to begin;

## Mobile-App

**This App was only tested on Android Platform**
- Before run front-end server remember to start backend first;
- Enter on fastfeetmobile folder from main;
- Run `yarn` to install de dependencies;
- Edit BaseURL on `/src/services/api.js` changing for an IP address that corresponding to your local machine:
  - Emulator: `http://10.0.3.2:3333`;
  - Android Phone USB: `http://IP_ADDRESS:3333`;
- Open the emulator or an Android Phone plugged on Computer and Run `react-native run-android` and `react-native start`.

## How to contribute

- Do it a fork from this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Do commits of your Changes: `git commit -m 'feat: My new feature'`;
- Do it a push for your branch: `git push origin my-feature`.

After the merge of your pull request will have done, You can delete your branch.

## License

This project is under the MIT license. See the archive [LICENSE](LICENSE.md) for more details.

---

Made by Caique Roschel
