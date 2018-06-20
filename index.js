const express = require ('express')
const app = express ()
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var secretkey = 'wwwww'

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req,res) => {
    let obj = {
        'username' : 'Ger',
        'address' : 'jaksel'
    }
    res.status(404).end('Not found lmao')
})

app.post('/', (req,res) => {
    let body = req.body
    let token = jwt.sign({'Hello': 'world'})
    res.status(404).end('Not found lmao')
})

app.post('/login', (req,res) => {
    let body = req.body
    if (body.username == 'ger' && body.pass == '123'){
        let token = jwt.sign({'Hello': 'World'}, secretkey)
        res.send(token)
    }
    else{
        res.status(403).end('Not found lmao')
    }
    
})

app.get('/myprofile', (req, res)=>{
    var token = req.headers['authorization']
    jwt.verify(token, secretkey, function(err,decoded){
        if(decoded==undefined){
            res.status(403).end('Not found lmao')
        }
        else{
            res.status(200).end('GGWP')
        }
    } );
    
})

app.get('/myprofile/:userid', (req,res) => {
    let userid = req.params.userid
    res.send('my profile ' +userid)
})

app.delete('/user',(req, res) =>{
    let body = req.body
    res.json(body)
})

app.listen(3000)