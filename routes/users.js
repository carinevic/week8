
/*
const express = require('express')
const router = express.Router()

var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5430/booksblogs';
var db = pgp(connectionString);

router.get('/',(req,res)=>{
    db.any('SELECT bookid,title,author,year,description,reviews FROM bookjunky;')
.then(bookjunky => {
    
    res.render('index',{bookjunky: bookjunky},users)

})
    
})

//users to add books to the database
router.get('/add-book',(req,res)=>{
    res.render('add-book')
})
router.post('/add-book',(req,res)=>{
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
router.get('/update',(req,res) =>{
    res.render('update')
})

router.post('/update',(req,res) =>{
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
router.get('/:id',(req,res) =>{
    const id = req.params.id;
    if(typeof id !=='undefined'){

   
    db.none(bookjunky)
    .select()
    .where('id',id)
    .first()
    .then(bookjunky =>{
        res.render('single',{bookjunky: bookjunky})
   

    
    })
}else{
    res.status(500)
    res.render('error',{
        message: 'Invalid id'
    })
}
})
})

module.exports = router
*/