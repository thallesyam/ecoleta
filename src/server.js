const express = require('express')
const server = express()
const nunjucks = require('nunjucks')


server.use(express.static('public'))

nunjucks.configure('src/views', {
    express: server,
    autoescape: false,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index.njk')
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.njk')
})
server.get('/search', (req, res) => {
    return res.render('search-results.njk')
})


server.listen(3000, () => {
    console.log('Server on')
})