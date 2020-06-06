const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
// Pegando o banco de dados
const db = require('./database/db')

server.use(express.static('public'))

//Habilitar o req.body
server.use(express.urlencoded({extended: true}))

nunjucks.configure('src/views', {
    express: server,
    autoescape: false,
    noCache: true
})


server.get('/', (req, res) => {
    return res.render('index.njk')
})

server.get('/create-point', (req, res) => {
    console.log(req.query)
    return res.render('create-point.njk')
})

server.post('/savepoint', (req, res) => {
    // console.log(req.body)

    // Inserir dados no banco de dados

        const query = `
            INSERT INTO places(
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
           req.body.image,
           req.body.name,
           req.body.address,
           req.body.address2,
           req.body.state,
           req.body.city,
           req.body.items
        ]

        function afterInsertData(err){
            if(err){
               console.log(err)
               return res.send('Erro no cadastro')
            }

            console.log('Cadastrado com sucesso')
            console.log(this)
            return res.render('create-point.njk', {saved: true})
        }

        db.run(query, values,  afterInsertData) 

})

server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == ''){
        //Mostrar o njk com os dados do banco de dados 
        return res.render('search-results.njk', {total: 0})
    }

    // Pegando os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
            
        const total = rows.length

        //Mostrar o njk com os dados do banco de dados 
        return res.render('search-results.njk', {places: rows, total})
    })

})


server.listen(3000, () => {
    console.log('Server on')
})