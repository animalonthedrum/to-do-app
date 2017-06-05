//requires

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//globals
var port = 8080;
var config = {
  database: 'todo',
  host: 'localhost',
  port: 5432,
  max: 30
}; // end config obj

var pool = new pg.Pool(config);

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url

// get route
app.get('/todo', function(req, res) {
  console.log('get hit to /todo');
  // connect to db
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error conencting to db');
      done();
      res.send('not working');
    } // end Error
    else {
      console.log('connected to db');
      var allTasks = [];
      // create our query string
      // tell db to run query
      // hold results in variable
      var resultSet = connection.query('SELECT * from to_do');
      resultSet.on('row', function(row) {
        // loop through result set and push each row into an array
        allTasks.push(row);
      }); // end
      resultSet.on('end', function() {
        // close connection
        done();
        // send back data
        res.send(allTasks);
      });
    } // end no error
  }); // end pool connect
}); // end /todo get

// post route
app.post('/todo', function(req, res) {
  console.log('post hit to /todo:', req.body);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log(err);
      done();
      res.send(400);
    } // end error
    else {
      console.log('connected to db');
      connection.query("INSERT INTO to_do ( task, complete) values ( $1, $2 )", [req.body.task, req.body.complete]);
      done();
      res.send(200);
    } // end no error
  }); // end pool connect
}); // end /todo post


app.delete('/delete', function(req, res) {
  res.send('DELETE request to homepage');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to DB');
      console.log(req.body.id);
      connection.query('DELETE FROM to_do WHERE id = $1', [req.body.id]);
      done();
      res.send(200);
    } //end else
  }); //end pool connect
});


app.post('/update', function(req, res) {
  console.log('/update url hit');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error connection to the server');
      done();
      res.send(400);
    } //end err if
    else {
      console.log('connected to db');
      connection.query('UPDATE to_do SET complete = $1 WHERE id = $2', [true, req.body.id]);
      done();
      res.send(200);
    } // end elseif
  }); //end pool.connec
  res.send(200);
});
