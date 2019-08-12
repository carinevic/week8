const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()

app.use(express.urlencoded())
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5430/booksblogs';
var db = pgp(connectionString);
//main page
app.get('/',(req,res)=>{
    db.any('SELECT bookid,title,author,year,description,reviews FROM bookjunky;')
.then(bookjunky => {
    
    res.render('index',{bookjunky: bookjunky})

})
    
})
//users to add books to the database
app.get('/add-book',(req,res)=>{
    res.render('add-book')
})
app.post('/add-book',(req,res)=>{
    let title = req.body.title
    let author = req.body.author
    let year = req.body.year
    let description = req.body.description
    let reviews = req.body.reviews

    db.none('INSERT INTO bookjunky(title,author,year,description,reviews) VALUES($1,$2,$3,$4,$5)',
    [title,author,year,description,reviews]).then(() => {
        res.redirect('/')  
    })


})
app.get('/update',(req,res) =>{
    res.render('update')
})

app.post('/update',(req,res) =>{
    let author = req.body.author
    let year = req.body.year
    let bookid= parseInt(req.body.bookid)
    console.log(bookid)
    console.log(author)
db.none('UPDATE bookjunky SET author=$1, year=$2 where bookid=$3',[author,year,bookid])
.then(() =>{
    console.log("UPDATED")
}).catch(error =>{
    console.log(error)
    res.render('/update')
})

  
})
app.listen(3000,()=>{
    console.log('server is running')
})