var express = require('express');
var router = express.Router();
var db = require('../connector');
/* GET home page. */
router.get('/:farmID', function(req, res, next) {
	db.query("SELECT * FROM pond where FarmId = ?", req.params['farmID'], function(err, results, fields) {
		if (err)
		{
			console.log(err);
			throw err;
		}
		return res.json(results);
	})
});

router.post('/:farmID', function(req, res, next) {
  db.query("INSERT INTO pond SET name=?, size=?, farmId=?",[req.body['name'],req.body['size'],req.params['farmID']], function(err, results, fields) {
  	if(err) {
  		console.log(err);
  		return res.send(400);
  	}
  	return res.send(200);
  })
});

router.delete('/:farmID', function(req, res, next) {
  db.query("DELETE FROM pond WHERE pondId=?",req.body['id'], function(err, results, fields) {
    if(err) {
      console.log(err);
      return res.send(400);
    }
    return res.send(200);
  })
});

router.patch('/:farmID', function(req, res, next) {
  db.query("UPDATE pond SET name=?, size=? WHERE pondId=?",[req.body['name'],req.body['size'],req.body['id']], function(err, results, fields) {
    if(err) {
      console.log(err);
      return res.send(400);
    }
    return res.send(200);
  })
});

module.exports = router;
