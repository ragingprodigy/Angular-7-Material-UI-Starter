# Angular-7-Material-UI-Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Getting Started

Run a search for `dev-project` in the root directory of this project and replace all occurences with the desired name of your project. Afterwards, you can then install the dependencies from `package.json` using `npm install` or `yarn`.

Update the `environment.ts` file by setting the location of the backend API

## Assumptions

A few assumptions are made with regards to the Authentication provided by this app. The app expects requests to be authorized using a JSON Web Token (JWT) and that said token, when decoded, would contain a structure similar to:

```
 {
 	"name": "User name",
 	"username": "some-username",
 	"last_login": "2017-08-05T01:07:04"
 }
```

along with other claims required by the app.

This web client is ready to work seamlessly with this [Lumen 5.7.* API Template](https://github.com/ragingprodigy/Lumen-API-Template)

## Styling

You can change the Material Color Palette by modifying `src/styles.scss`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
