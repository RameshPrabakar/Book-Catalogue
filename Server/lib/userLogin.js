var userLoginController = require('../controller/userLogin');


var userLoginLib = {
    get : function(req,res){
        userLoginController.get(req,function(err,data){
            res(err,data);
        });
    }
}
module.exports = userLoginLib;