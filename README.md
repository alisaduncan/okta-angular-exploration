# OktaAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

This is an example of OktaAngular SDK and consuming code

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

