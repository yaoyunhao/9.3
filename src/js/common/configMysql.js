var mysql = require("mysql");
var pool = mysql.createPool({
    user: "root",
    database: "yyh",
    connectionLimit: 1000
});
module.exports = function(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        }
        con.query(sql, arr, function(err, result) {
            if (err) {
                return ck && ck(err);
            }
            ck && ck(null, result);
            con.release();
        })
    })
}