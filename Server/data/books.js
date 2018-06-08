var helper = require('./helper')
var async = require('async');
const SQL = require('sql-template-strings');

var booksData = {

    getAll: function (args, callback) {

        helper.query(` SELECT  
                            id 
                            ,title
                            ,isbn
                            ,publisher
                            ,date_published
                            ,author_name
                        FROM books `,
            function (err, response) {
                response = response.rows && response.rows.length ? response.rows : [];
                callback(err, response)
            });
    },

    getPCollections: function (args, callback) {

        helper.query(` SELECT  
                            books.id as book_id 
                            ,title
                            ,isbn
                            ,publisher
                            ,date_published
                            ,author_name
                            ,collection.type
                        FROM books
                            INNER JOIN collection on collection.book_id = books.id
                        WHERE collection.user_id = $1 AND collection.type = $2 `,[args.user_id,args.type],
            function (err, response) {
                response = response.rows && response.rows.length ? response.rows : [];
                callback(err, response)
            });
    },

    getOtherUserBooks: function (args, callback) {

        helper.query(` SELECT  
                            books.id as book_id 
                            ,title
                            ,isbn
                            ,publisher
                            ,date_published
                            ,author_name
                            ,collection.type
                        FROM books
                            INNER JOIN collection on collection.book_id = books.id
                        WHERE collection.user_id != $1 `,[args.user_id],
            function (err, response) {
                response = response.rows && response.rows.length ? response.rows : [];
                callback(err, response)
            });
    },
    getBookByValue: function (args, callback) {
        
        let params = [1];
        let filterQuery =` `;

        if(args.title && !args.isbn){
            filterQuery+=` AND title ilike '%${args.title}%' `;
        }
        
        if(!args.title && args.isbn){
            filterQuery+=` AND isbn ilike '%${args.isbn}%' `;
        }
        if(args.title && args.isbn){
            filterQuery+=` AND title ilike '%${args.title}%' AND isbn ilike '%${args.isbn}%' `;
        }

        const searchQuery = SQL`SELECT  
                                    id 
                                    ,title
                                    ,isbn
                                    ,publisher
                                    ,date_published
                                    ,author_name
                                FROM books WHERE 1=1 `
                                .append(filterQuery);

        helper.query(searchQuery.text,searchQuery.values,function (err, response) {
                response = response.rows && response.rows.length ? response.rows : [];
                callback(err, response)
            });
    },

    saveToMyCollection: function (args, callback) {

        const sql = ` WITH 
                        my_collection AS (
                            SELECT 
                                id as exist_book_id
                            FROM
                                collection
                            WHERE user_id = $1 AND book_id = $2 AND type = $3 
                        ),
                        insertion AS (
                            INSERT INTO collection (
                                user_id,
                                book_id,
                                type
                            )
                            SELECT 
                                $1,
                                $2,
                                $3
				            WHERE NOT EXISTS (SELECT * FROM my_collection)
                            RETURNING id as new_book_id
                       ) 
                       SELECT * FROM my_collection
                        UNION 
                       SELECT * FROM insertion
                       `;

        helper.query(collectionQuery,[args.user_id,args.book_id,args.type],
            function (err, response) {
                response = response.rows && response.rows.length ? response.rows : [];
                callback(err, response)
            });
    },

    save: function (args, callback) {
       
        const sqlQuery = ` WITH 
                        book_insertion AS (
                            INSERT INTO books (
                                title,
                                isbn,
                                publisher,
                                date_published,
                                author_name
                            )
                            VALUES (
                               $1,
                               $2,
                               $3,
                               $4,
                               $5 
                            )
                            RETURNING id AS book_id
                        ),
                        collection_insertion AS (
                            INSERT INTO collection (
                                user_id,
                                book_id,
                                type
                            )
                            SELECT 
                                $7,
                                (SELECT book_id FROM book_insertion),
                                $6
				            WHERE EXISTS (SELECT book_id FROM book_insertion)
                            RETURNING id as collection_id
                       ) 
                       SELECT * FROM book_insertion
                       UNION 
                       SELECT * FROM collection_insertion
                       `;

        helper.query(sqlQuery,[args.title,args.isbn,args.publisher_name,args.date_published,args.author_name,args.type,args.user_id],
            function (err, response) {
                callback(err, response)
            });
    }
}
module.exports = booksData;
