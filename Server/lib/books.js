
var booksController = require('../controller/books');


var booksLib = {
    save:function(req,res){
        booksController.save(req.body,function(err,data){
            res(err,data);
        });
    },
    getAll : function(req, callback){
        booksController.getAll(req,function(err,data){
            callback(err,data);
        });
    },
    getPCollections : function(req, callback){
        booksController.getPCollections(req,function(err,data){
            callback(err,data);
        });
    },
    searchBooks : function(req, callback){
        booksController.getBookByValue(req,function(err,data){
            callback(err,data);
        });
    },
    getOtherUserBooks : function(req, callback){
        booksController.getOtherUserBooks(req,function(err,data){
            callback(err,data);
        });
    },
    savePCollections : function(req, callback){
        booksController.savePCollections(req,function(err,data){
            callback(err,data);
        });
    },

   
}
module.exports = booksLib;