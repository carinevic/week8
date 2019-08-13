const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path= require('path')
//const userRoutes = require('./routes/users')

app.use(express.urlencoded())
//initialize a router
//app.use('/users',userRoutes)

const VIEWS_PATH = path.join(__dirname,'/views')
//acess file at the root level. 
app.use('/css',express.static("css"))


app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
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

    db.one('INSERT INTO bookjunky(title,author,year,description,reviews) VALUES($1,$2,$3,$4,$5) RETURNING bookid',
    [title,author,year,description,reviews])
    .then((data) => {
        console.log(data)
    }).catch(error => console.log(error))
    res.redirect('/')  
})

app.get('/update/:bookid',(req,res) =>{
    let bookid= req.params.bookid
    db.any('SELECT bookid, title, author, year, description, reviews FROM bookjunky WHERE bookid=$1',[bookid])
    .then((book)=>{
        res.render('update',{book:book})
    })
   
})
app.post('/edit',(req,res) =>{
    let bookid = req.body.bookid
    console.log(bookid)
    res.redirect(`/update/${bookid}`)
})
app.post('/update',(req,res) =>{
    let title = req.body.title
    let author = req.body.author
    let year = req.body.year
    let description = req.body.description
    let reviews = req.body.reviews
    let bookid= parseInt(req.body.bookid)
    
db.one('UPDATE bookjunky SET title=$2, author=$3, year=$4, description=$5,reviews=$6 WHERE bookid=$1 RETURNING *',[bookid, title, author,year, description, reviews])
.then((data) =>{
    console.log("UPDATED")
    res.redirect('/')
}).catch(error =>{
    console.log(error)
   
})


})

  app.post('/delete',(req,res)=>{
    let bookid= req.body.bookid
      db.none('DELETE FROM bookjunky WHERE bookid=$1' ,[bookid])
      .then(() =>{
          res.redirect('/')
      })
  })

  
app.listen(3000,()=>{
    console.log('server is running')
})