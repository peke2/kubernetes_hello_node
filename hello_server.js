const http = require('http');
const mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;

var callCount = 0;

const server = http.createServer((req, res)=>{
    const connection = mysql.createConnection({
        // host : 'database',
        // user : 'root',
        // password : 'root',
        host : 'hello-mysql',
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_ROOT_PASSWORD,
        database : 'hello'
    });
    // connection.connect();
    
    var count = -1;
    connection.query('SELECT * FROM hello WHERE id=1;', function(err, rows, fields){
        if(err){console.log('error: '+err);}
        count = rows[0].count;
    
    //     // console.log('count=['+count+']');
    //     // for(var r of rows){
    //     //     console.log(r);
    //     // }
    //     // console.log('--------');
    //     // for(var f of fields){
    //     //     console.log(f);
    //     // }
    //     // console.log('--------');
    });

    connection.query('UPDATE hello SET count=count+1 WHERE id=1;', function(err, result){
        //  状態が整った段階でレスポンスを返す
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.end('Hello Node.js\ncount=['+count+']');    //  キューで順番に処理されるなら、直前のクエリで取得した値が有効なはず
    });

    connection.end();

    // res.statusCode = 200;
	// res.setHeader('Content-type', 'text/plain');
	// res.end('Hello Node.js\ncount=['+count+']');
});

//	hostname の指定があると、対象のホスト以外からのアクセスを拒否する
//server.listen(port, hostname, ()=>{
server.listen(port, ()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
});

console.log('---- all complete ----');
