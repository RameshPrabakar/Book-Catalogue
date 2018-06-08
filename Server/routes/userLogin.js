var userLoginLib = require('../lib/userLogin'),
    express = require('express'),
    app = module.exports = express();


//user login
app.post('/login', function(req,res){
   userLoginLib.get(req,function(err,data){
       if(data && data.response && data.response[0].user_id) {
           if(req.session) {
               req.session['userid'] = data.response[0].user_id;
           }
       }
       res.send(data);
   });
});


