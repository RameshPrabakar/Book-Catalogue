var booksModel = require('../data/books');

var booksController = {

    save: function (req, res) {
        booksModel.save(req, function (err, data) {
            res(err, data)
        });
    },

    getAll: function(req,callback){
        booksModel.getAll(req, function (err, data) {
            callback(err, data)
        });
    },
    getPCollections: function(req,callback){
        booksModel.getPCollections(req, function (err, data) {
            callback(err, data)
        });
    },
    getBookByValue: function(req,callback){
        booksModel.getBookByValue(req, function (err, data) {
            callback(err, data)
        });
    },
    getOtherUserBooks: function(req,callback){
        booksModel.getOtherUserBooks(req, function (err, data) {
            callback(err, data)
        });
    },
    savePCollections: function(req,callback){
        booksModel.saveToMyCollection(req, function (err, data) {
            callback(err, data)
        });
    },


}
module.exports = booksController;