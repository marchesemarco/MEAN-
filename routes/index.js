var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'grossi.marco',  
    password: 'xxx123#', 
    server: "213.140.22.237",  
    database: 'grossi.marco', 
}

router.get('/', function (req, res, next) {
    let sqlQuery = "select * from dbo.[cr-unit-attributes]";
    executeQuery(res, sqlQuery, next);
});

let executeQuery = function (res, query, next) {
    sql.connect(config, function (err) {
        if (err) { 
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); 
        request.query(query, function (err, result) { 
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
                sql.close();
                return;
            }
            renderPug(res, result.recordset);
            return;
        });
    });
}

function renderPug(res, recordset) {
    res.render('index', {
        title: 'Tutte le unità:',
        re: recordset,
    });
}

module.exports = router;