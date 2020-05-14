var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'bosqueth',
  password: '123456',
  port: "8889",
  database: 'optimapp'


});


conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected BD !");
  sql1= "SELECT * FROM activityType "; //type d'activité 
  sql2= "SELECT * FROM `user` "; // Users
  sql3= "SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU = 'bosqueth' ORDER BY DATE" // toutes les imputation pour un user définie 
  
  //imputé activité à date x pour un user:
  //1-vérifier si l'idA a déjà été crée ce jour la pour un user définie en parametre
sql4= "SELECT idA FROM `activity` WHERE idU = 'bosqueth' AND date='2020-05-11'"
// if rowcount(resultat)=0;
// 2-si vide ajout de l'activité 
sql5= " INSERT INTO `activity` (`idA`, `idU`, `period`, `date`, `activityType`) VALUES (NULL, 'bosqueth', 'MATIN', '2020-05-15', 'FORMATION'), (NULL, 'bosqueth', 'APRES_MIDI', '2020-05-15', 'PRODUCTION')"
// affichage de l'update classé par date
sql6="SELECT * FROM activity JOIN comments ON activity.idA = comments.idA WHERE idU = 'bosqueth' ORDER BY DATE" // toutes les imputation pour un user définie 


  conn.query(sql4, function (err, result, fields) {
  if (err) throw err;
  console.log(JSON.stringify(result));
  conn.end();
  console.log("Disconnect!");
});
});





