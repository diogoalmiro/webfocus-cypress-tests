let sharedConfiguration = require('./shared.json');
let WebfocusApp = require('@webfocus/app');
let app = new WebfocusApp({
    port : 9999,
    name : "Cypress Test Application"
});

app.registerComponent(require('./cypress-component'))

app.start();