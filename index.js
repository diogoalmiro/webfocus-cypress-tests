let WebfocusApp = require('@webfocus/app');
let app = new WebfocusApp({
    port : 9999,
    name : "Cypress Test Application"
});

app.registerComponent(require('./cypress-component'))
app.registerComponent(require('./static-tests'))

app.start();