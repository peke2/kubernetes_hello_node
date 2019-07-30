const http = require('http');
const mysql = require('mysql');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

var callCount = 0;

var commit_hash = fs.readFileSync('container_hash.txt', 'utf8').trim();

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
    });

    connection.query('UPDATE hello SET count=count+1 WHERE id=1;', function(err, result){
        //  状態が整った段階でレスポンスを返す
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
        var message = 'Hello Node.js\ncount=['+count+'->'+(count+1)+']\n(hash:'+commit_hash+')\n';
        message += '更新確認\n';
        res.end(message);    //  キューで順番に処理されるなら、直前のクエリで取得した値が有効なはず
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
