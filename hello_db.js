const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'database',
    user : 'root',
    password : 'root',
    database : 'hello'
});

console.log('---- connection start ----');
connection.connect();
    
var count = -1;
connection.query('SELECT * FROM hello WHERE id=1;', function(err, rows, fields){
    if(err){console.log('error: '+err);}
    count = rows[0].count;
    console.log('count=['+count+']');

    console.log(rows);
    console.log('--------');
    for(var r of rows){
        console.log(r);
    }
    console.log('--------');
    for(var f of fields){
        console.log(f);
    }
    console.log('--------');
});

console.log('---- connection end ----');
connection.end();
console.log('---- finished ----');
