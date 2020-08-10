var express = require('express');
var router = express.Router();
var db = require('../connector');
/* GET home page. */
router.get('/', function(req, res, next) {
	db.query("SELECT * FROM farm", function(err, results, fields) {
		if (err)
		{
			console.log(err);
			throw err;
		}
		return res.json(results);
	})
});

router.post('/total-area', function(req, res, next) {
  db.query("SELECT SUM(size) FROM pond WHERE farmID=?", req.body['id'], function(err, results, fields) {
    if (err)
    {
      console.log(err);
      throw err;
    }
    return res.send(200, results[0]['SUM(size)']);
  })
});

router.post('/', function(req, res, next) {
  db.query("INSERT INTO farm SET name=?", req.body['name'], function(err, results, fields) {
  	if(err) {
  		console.log(err);
  		return res.send(400);
  	}
  	return res.send(200);
  })
});

router.delete('/', function(req, res, next) {
  db.query("DELETE FROM farm WHERE farmId=?", req.body['id'], function(err, results, fields) {
  	if(err) {
  		console.log(err);
  		return res.send(400);
  	}
  	return res.send(200);
  })
});

router.patch('/', function(req, res, next) {
	db.query("UPDATE farm SET name=? WHERE farmId=?", [req.body['name'], req.body['id']], function(err, results, fields) {
  	if(err) {
  		console.log(err);
  		return res.send(400);
  	}
  	return res.send(200);
  })
});

module.exports = router;
