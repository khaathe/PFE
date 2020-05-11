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
  conn.query(sql3, function (err, result, fields) {
  if (err) throw err;
  console.log(JSON.stringify(result));
  conn.end();
  console.log("Disconnect!");
});
});





