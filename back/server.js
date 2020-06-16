var express = require('express');
var mysql = require('mysql');

var config = require('./config.json') ;
var users = require('./users.json');
const { Console } = require('console');

var app = express();

var conn = mysql.createConnection(config.db);

//Configure l'app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('', (req, res) => {
//   conn.query('', (err, result, fields) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

/** Route pour les activités */
app.route('/activity')
  .get((req, res) => {
  console.log('GET /activity params[idU=%s]', req.query.idU)
  getUserActivity(req.query.idU, res)
  })
  .post(function (req, res) {
    console.log('POST /activity param[activities=%o, idU=%s]',req.body.activities, req.body.idU);
    for (const activity of req.body.activities) {
      if(activity.idA) { updateActivity(activity); }
      else { inserActivityIntoTable(activity); }
    }
    getUserActivity(req.body.idU, res);
  })

  
/** Route pour la gestion des types d'activités */
app.route('/activity/type')
.get((req, res) => {
conn.query('SELECT * FROM activityType', (err, result, fields) => {
  console.log('GET /activity/type')
  if (err) throw err;
  res.setHeader("Access-Control-Allow-Origin","*");
  res.json(result);
});
})

/** Route pour les Utilisateurs */
app.route('/user')
  .get((req, res) => {
    conn.query('SELECT * FROM `user` where idU=?', [req.query.idU], (err, result, fields) => {
      console.log('GET /user params[idU',req.query.idU,']')
      if (err) throw err;
      res.setHeader("Access-Control-Allow-Origin","*");
      res.json(result);
    });
  })

//Fonction qui permet de renvoyer la liste d'imputation d'un user
//Est utilisé à chaque get ou post pour synchro la bd et l'appli
function getUserActivity(idU, res){
  conn.query('SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU =? ORDER BY activity.dateActivity', [idU], (err, result, fields) => {
    if (err) throw err;
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

function inserActivityIntoTable (activity) {
  conn.query("INSERT INTO `activity` (`idU`, `period`, `dateActivity`, `activityType`) VALUES (?, ?, ?, ?)", 
  [activity.idU, activity.period, activity.dateActivity, activity.activityType],
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

// app.get('/', function(req, res) {
//   fs.readFile('./dist/PFE/index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// });

app.listen(config.server.port);
console.log("listening on port ", config.server.port);