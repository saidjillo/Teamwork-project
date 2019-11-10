const { Pool, Client } = require("pg");


var conString = "postgres://qiuotljj:OhtfHaRTP6ydqghXDcZ6NAEEV1_OE8na@salt.db.elephantsql.com:5432/qiuotljj" //Can be found in the Details page
var client = new Client(conString);

client.connect(function(err) {

  if(err) {
    return console.error('could not connect to postgres', err);
  }

//   client.query("SELECT * FROM employees ", (err, result)=>{
//     console.table(result.rows);
//   })
 
});




module.exports = client;





