var helper = require('./helper')

var userLoginData = {
    //get the user login success
    get: function (args, res) {
        var args = args.body;
        
        let sql = ``;
        let params;
        if (args.email) {
            sql += `WITH 
                    check_login AS ( 
                        SELECT 
                            id AS user_id 
                        FROM 
                            users 
                        WHERE email = $1
                    ),
                    create_user AS (
                        INSERT INTO users (
                            email,
                            username
                        )
                        SELECT
                            $1,
                            $2
                        WHERE 
                            NOT EXISTS (SELECT * FROM check_login)
                        RETURNING id AS user_id
                    )
                    SELECT * FROM  check_login
                    UNION 
                    SELECT * FROM  create_user `;
            params = [args.email, args.name]
        } else {
            sql += `SELECT id AS user_id from users where username = $1 AND password = $2`;
            params = [args.username, args.password]
        }
        
        helper.query(sql, params, function (err, response) {
            
            response = response.rows && response.rows.length ? response.rows : [];
            if (err)
                return res(err, {
                    'status': 'Failed to login'
                });
            if (response.length) {
                return res(err, {
                    'response': response,
                    'status': 'Login Success'
                })
            } else {
                return res(err, {
                    'status': 'Failed to login'
                });
            }
        });
    },
}
module.exports = userLoginData;
