let component = module.exports = require('@webfocus/app/component')('Cypress Component Test', 'Define UI for cypress tests')
let pagination = require('@webfocus/app/util').pagination;

const STRING = `GET /api/${component.urlname}/ should return this string.`;

component.app.get('/test-string', (req, res) => {
    res.json(STRING)
})

component.app.get('/test-pagination', pagination(async () => Array(100).fill(0).map((_,i) => i)))