var mysql = require('mysql')
var db = require('connector');

db.query("CREATE TABLE farm(farmId int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(200) NOT NULL);",
  function () {
    db.query("CREATE TABLE pond(pondId int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(200) NOT NULL, size REAL NOT NULL, FarmId int, FOREIGN KEY(FarmId) REFERENCES farm(farmId) ON DELETE CASCADE);", function (err, a,b) {
      if (err)
        console.log(err);
      else
        process.exit();
    })
  })
