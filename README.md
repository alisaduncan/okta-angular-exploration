# OktaAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

This is an example of OktaAngular SDK and consuming the SDK. It demonstrates
1. Using Angular CLI to create a library project, which sets up the [build tools for the library](https://angular.io/guide/creating-libraries) and sets configuration for consuming the library in the same project - file paths are editable in the `angular.json` for better consistency with other projects
2. Sets up `forRoot()` recommended pattern for configuring the `OktaAuthModule` without requiring the consumer to configure the `OKTA_CONFIG` injection token provider and to ensure a singleton of the module exists for the application. 
3. Demonstrates watching `RouterEvent`s to avoid defining a route specifically for the callback component
4. Enhances the existing SDK with the ability to load Okta configuration asynchronously (such as via a Http call) as a built-in capability. Decoupling the config loading from app loading allows the consumer to avoid having to go through a multi-step workaround and making the external server call when bootstrapping the application.

## Getting going

```
git clone git@github.com:alisaduncan/okta-angular-exploration.git
cd okta-angular-exploration
npm ci
```

### Build the library 

```
npm run build okta-angular
```

### Run the app
Update with your Okta config or run a server for the config loading which returns the config values.
The [okta-angular-async-config-example](https://github.com/oktadev/okta-angular-async-load-example) repo has an Express server you can use

Once you have your configs set up

```
npm start
```
App runs on localhost:4200

Alternatively, run the following to have the app auto open

```
npm start -- -o
```

Minimum code changes to apply the `.forRoot()` pattern additively are named with the text `Orig`, such as `OktaAuthOrigModule` and `OktaAuthStateOrigService`. The consuming code example has example code using the `.forRoot()` and the current mechanism commented out. The consuming code example also has the code to handle the external loading of the Okta config commented out.
