var express = require('express');
var mysql = require('mysql');

var config = require('./config.json') ;
var users = require('./users.json');
const { resolve } = require('path');
const { reject, result } = require('lodash');

var app = express();

var conn = mysql.createConnection(config.db);

//Configure l'app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function query(sqlQuery,values) {
  return new Promise( (resolve, reject) => {
    conn.query(sqlQuery, values, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });  
  });
}

/** Route pour les activités */
app.route('/activity')
  .get(getActivity)
  .post(postActivity)

  
/** Route pour la gestion des types d'activités */
app.route('/activity/type')
  .get(getActivityType)
  .post(postActivityType)

/** Route pour les Utilisateurs */
app.route('/user')
  .get(getUser)
  .post(postUser)

 /** Route pour le calcul du temps de l'activité */
app.route('/calcul-temps-activite')
  .get(getCalculTempsActivite)

/** Fonction pour gérer les erreurs sql */
function handleSqlError(err){
  console.error(err);
}

function getActivity(req,res) {
  console.log('GET /activity params[idU=%s]', req.query.idU)
  getUserActivity(req.query.idU, res).then( (result) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

async function postActivity(req, res) {
  console.log('POST /activity param[activities=%o, idU=%s]',req.body.activities, req.body.idU);
  for (const activity of req.body.activities) {
    if (activity.idA)  await updateActivityAndComments(activity).catch(handleSqlError);
    else await insertActivityIntoTable(activity).catch(handleSqlError);
  }
  getUserActivity(req.body.idU, res).then( (result) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

function getActivityType(req,res) {
  console.log('GET /activity/type');
  query('SELECT * FROM activityType', []).then( (result) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  })
  .catch(handleSqlError);
}

function postActivityType(req, res){
  //TODO
}

/**
 * Renvoie les informations d'un utilisateur en base.
 * @param {*} req : requête
 * @param {*} res : reponse
 */
function getUser(req, res) {
  console.log('GET /user params[idU=%s]', req.query.idU);
  query('SELECT * FROM `user` where idU=?', [req.query.idU]).then( (result) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

function postUser(req,res) {
  //TODO
}

function  getCalculTempsActivite(req,res) {
  console.log('GET /calcul-temps-activite params[dateMin=%s, dateMax=%s]', req.query.dateMin, req.query.dateMax);
  query("SELECT idU, libelle, COUNT(DISTINCT idA) as nbActivity FROM activity NATURAL JOIN user JOIN activitytype ON (activitytype.code=activity.activityType) WHERE activity.dateActivity>=? and activity.dateActivity<=? GROUP BY idU, activityType", 
  [req.query.dateMin, req.query.dateMax])
  .then( (result) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.json(result);
  });
}

/** Fonction qui permet de renvoyer la liste d'imputation d'un user
 * Est utilisée à chaque get ou post pour synchro la bd et l'appli
 */
function getUserActivity(idU){
  return query('SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU =? ORDER BY activity.dateActivity', [idU]);
}

/**
 * Fonction pour insérer une activité en base. Insére aussi son commentaire si celui-ci n'est pas vide.
 * @param {*} activity : activité à insérer
 */
function insertActivityIntoTable (activity) {
  return query("INSERT INTO `activity` (`idU`, `period`, `dateActivity`, `activityType`) VALUES (?, ?, ?, ?)", 
  [activity.idU, activity.period, activity.dateActivity, activity.activityType])
  .then( (result) => insertCommentsIntoTable(result.insertId, activity.comments) );
  
}

/**
 * Insère un commentaire en base
 * @param {*} idA : id de l'activité
 * @param {*} comments : commentaire de l'activité
 */
function insertCommentsIntoTable(idA, comments) {
  return query("INSERT INTO comments (idA, comments) VALUES (?, ?)", [idA, comments]);
}

/**
 * Mets à jour une activité et son commentaire
 * @param {*} activity  : information de l'activité
 */
function updateActivityAndComments (activity){
  query("UPDATE activity SET idU=?, period=?, dateActivity=?, activityType=? where activity.idA=?", 
  [activity.idU, activity.period, activity.dateActivity, activity.activityType,activity.idA]);
  query("UPDATE comments SET comments=? where idA=?",[activity.comments, activity.idA]);
}

app.listen(config.server.port);
console.log("listening on port ", config.server.port);