var booksLib = require('../lib/books'),
    express = require('express'),
    app = module.exports = express();

app.post('/save', function(req,res){
    booksLib.save(req,function(err,data){
        res.send(data);
    });
});

app.get('/getAll',function(req,res){
    booksLib.getAll(req, function(err,data){
        res.send(data);
    });
});

app.get('/get_personal_collection',function(req,res){
    booksLib.getPCollections(req.query, function(err,data){
        res.send(data);
    });
});

app.get('/searchBooks',function(req,res){
    booksLib.searchBooks(req.query, function(err,data){
        res.send(data);
    });
});

app.get('/getOthersUserBooks',function(req,res){
    booksLib.getOtherUserBooks(req.query, function(err,data){
        res.send(data);
    });
});

app.post('/add_to_personal_collection',function(req,res){
    console.log('r1111',req.body)
    booksLib.savePCollections(req.body, function(err,data){
        res.send(data);
    });
});




