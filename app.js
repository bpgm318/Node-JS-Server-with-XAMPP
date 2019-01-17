var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

const baseURL = "http://localhost:3000/";



var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'sampleDB'
	
	
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

connection.connect(function(err) {
  if (err){
   throw err;
}
  console.log("Connected!");
});



app.get('/form', function(req, res){
	res.render('form');
});

app.get('/', function(req, res){
	connection.query("SELECT * FROM sampledbtable ORDER by Score desc", function(err, result, fi){
		if (err) {
			throw err;
		} else {
			res.render('index', {
				items: result

			});
		}
	});

});


app.post('/form', function(req, res){
	var query = "INSERT INTO `sampledbtable` (Score, Name, Proof, Comment) VALUES (";
	  query += " '"+req.body.Score+"',";
	  query += " '"+req.body.Name+"',";
	  query += " '"+req.body.Proof+"',";
	  query += " '"+req.body.Comment+"')";

	connection.query(query, function (err, result){
		res.redirect(baseURL);

	});

});

app.get('/about', function(req, res){
	res.render('about');
});



app.listen(3000);