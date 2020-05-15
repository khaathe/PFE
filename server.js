var express = require('express');
var app = express();
var fs = require('fs'); 
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: "3306",
  database: 'optimapp'
});

// app.get('', (req, res) => {
//   conn.query('', (err, result, fields) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

//Fonction qui permet de renvoyer la liste d'imputation d'un user
//Est utilisé à chaque get ou post pour synchro la bd et l'appli
function getUserActivity(idU, res){
  conn.query('SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU = "?" ORDER BY DATE', [idU], (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
}

app.get('/activity', (req, res) => getUserActivity(req.query.idU, res) );

app.get('/user', (req, res) => {
  conn.query('SELECT * FROM `user` where idU=?', [req.query.idU], (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/activity/type', (req, res) => {
  conn.query('SELECT * FROM activityType', (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

function inserActivityIntoTable (activity) {
  conn.query("INSERT INTO `activity` (`idU`, `period`, `date`, `activityType`) VALUES (?, ?, ?, ?)", 
  [activity.idU, activity.period, activity.date, activity.activityType],
  (err, result, fields) => {
    if (err) throw err;  
  });
  conn.query("INSERT INTO comments (idA, comments) VALUES (?, ?)", 
  [activity.idA, activity.comments],
  (err, result, fields) => {
    if (err) throw err;  
  });
}

function updateActivity (){
  conn.query("UPDATE `activity` SET idU=?, period=?, date=?, activityType=? where activity.idA=?", 
  [activity.idU, activity.period, activity.date, activity.activityType,activity.idA],
  (err, result, fields) => {
    if (err) throw err;  
  });
  conn.query("UPDATE comment SET comments=? where idA=?", 
  [activity.comments, activity.idA],
  (err, result, fields) => {
    if (err) throw err;  
  })
}

app.post('/activity', function (req, res) {
  for (const activity of req.body.activities) {
    if(activity.idA) { updateActivity(activity); }
    else { inserActivityIntoTable(activity); }
  }
  getUserActivity(idU, res);
});

// app.get('/', function(req, res) {
//   fs.readFile('./dist/PFE/index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// });

app.listen(8080);