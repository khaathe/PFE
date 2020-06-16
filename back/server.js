var express = require('express');
var mysql = require('mysql');

var config = require('./config.json') ;
var users = require('./users.json');
const { resolve } = require('path');

var app = express();

var conn = mysql.createConnection(config.db);

//Configure l'app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('', (req, res) => {
//   conn.query('', (err, result, fields) => {
//     if (err) handleSqlError(err);
//     res.json(result);
//   });
// });

/** Route pour les activités */
app.route('/activity')
  .get((req, res) => {
  console.log('GET /activity params[idU=%s]', req.query.idU)
  getUserActivity(req.query.idU, res)
  })
  .post(modifyActivities)

  
/** Route pour la gestion des types d'activités */
app.route('/activity/type')
.get((req, res) => {
conn.query('SELECT * FROM activityType', (err, result, fields) => {
  console.log('GET /activity/type')
  if (err) handleSqlError(err);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.json(result);
});
})

/** Route pour les Utilisateurs */
app.route('/user')
  .get((req, res) => getUserInformation(req.query.idU, res) )

/** Fonction pour gérer les erreurs sql */
function handleSqlError(err){
  console.error(err);
}

async function query(sqlQuery,values) {
  return new Promise( (resolve, reject) => {
    conn.query(sqlQuery, values, (err, result, fields) => {
      if(err) reject(err);
      return result;
    })
  });
}

/**
 * Renvoie les informations d'un utilisateur en base.
 * @param {*} idU : id utilisateur
 * @param {*} res : reponse
 */
function getUserInformation(idU, res) {
    conn.query('SELECT * FROM `user` where idU=?', [idU], (err, result, fields) => {
    console.log('GET /user params[idU=%s]', idU);
    if (err) handleSqlError(err);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

/** Fonction qui permet de renvoyer la liste d'imputation d'un user
 * Est utilisée à chaque get ou post pour synchro la bd et l'appli
 */
function getUserActivity(idU, res){
  conn.query('SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU =? ORDER BY activity.dateActivity', [idU], (err, result, fields) => {
    if (err) handleSqlError(err);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

function modifyActivities(req, res) {
  console.log('POST /activity param[activities=%o, idU=%s]',req.body.activities, req.body.idU);
  promiseActivitiesModified = new Promise( (resolve, reject)=> { 
    for (const activity of req.body.activities) {
      if (activity.idA)  updateActivityAndComments(activity);
      else  insertActivityIntoTable(activity);
    }
    resolve();
  });
  promiseActivitiesModified.then( ()=>getUserActivity(req.body.idU, res));
}

/**
 * Fonction pour insérer une activité en base. Insére aussi son commentaire si celui-ci n'est pas vide.
 * @param {*} activity : activité à insérer
 */
function insertActivityIntoTable (activity) {
  conn.query("INSERT INTO `activity` (`idU`, `period`, `dateActivity`, `activityType`) VALUES (?, ?, ?, ?)", 
  [activity.idU, activity.period, activity.dateActivity, activity.activityType],
  (err, result, fields) => {
    if (err) handleSqlError(err);
    if (activity.comments) insertCommentsIntoTable(result.insertId, activity.comments);
  });
  
}

/**
 * Insère un commentaire en base
 * @param {*} idA : id de l'activité
 * @param {*} comments : commentaire de l'activité
 */
function insertCommentsIntoTable(idA, comments) {
  conn.query("INSERT INTO comments (idA, comments) VALUES (?, ?)", 
  [idA, comments],
  (err, result, fields) => {  
    if (err) handleSqlError(err);
  });
}

/**
 * Mets à jour une activité et son commentaire
 * @param {*} activity  : information de l'activité
 */
function updateActivityAndComments (activity){
  conn.query("UPDATE activity SET idU=?, period=?, dateActivity=?, activityType=? where activity.idA=?", 
  [activity.idU, activity.period, activity.dateActivity, activity.activityType,activity.idA],
  (err, result, fields) => {
    if (err) handleSqlError(err);  
  });
  conn.query("UPDATE comments SET comments=? where idA=?", 
  [activity.comments, activity.idA],
  (err, result, fields) => {
    if (err) handleSqlError(err);  
  })
}

// app.get('/', function(req, res) {
//   fs.readFile('./dist/PFE/index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// });

/** Requête imputation temporelle
 * SELECT idU, libelle, COUNT(DISTINCT idA) as nbActivity FROM `activity` NATURAL JOIN user JOIN activitytype ON (activitytype.code=activity.activityType) WHERE activity.dateActivity>='2020-06-16' and activity.dateActivity<='2020-06-18' GROUP BY idU, activityType
 */
app.listen(config.server.port);
console.log("listening on port ", config.server.port);