module.exports = require('@webfocus/component')('Static Tests', 'Test GET requests to different files and folders.')

module.exports.app.get('/', (req, res) => {
    res.json("API Component String")
})