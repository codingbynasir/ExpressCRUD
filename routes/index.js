var express = require('express');
var router = express.Router();
var db=require('./connection');

router.get('/contact', function(req, res) {
    console.log(req.headers);
    db.conn.query('SELECT * FROM contact', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

router.get('/contact/:id', function(req, res) {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    db.conn.query('SELECT * FROM contact WHERE id=?',id, function (error, results, fields) {
        if (error) throw error;
        return res.send(results[0]);
    });
});
router.post('/contact', function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    if (!name || !email || !phone) {
        return res.status(400).send({error:true, message: "Invalid input"});
    }
    db.conn.query("INSERT INTO `contact` (`id`, `name`, `email`, `phone`) VALUES (NULL, ?, ?, ?)",[name, email, phone], function (error, results, fields) {
        if (error){
            return res.status(409).send({error:true, message:"Duplicate phone number"});
        }
        return res.send({error:false, message:"Data is inserted"});
    });
});

router.put('/contact/:id', function(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    db.conn.query('UPDATE `contact` SET `name`=?, `email`=?, `phone`=? WHERE `id`=?',[name, email, phone, id], function (error, results, fields) {
        if (error) throw error;
        return res.send({error:false, message:"Contact is updated"});
    });
});
router.delete('/contact/:id', function(req, res) {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    db.conn.query('DELETE FROM contact WHERE id=?',id, function (error, results, fields) {
        if (error) throw error;
        return res.send({error:false, message: 'Contact is deleted'});
    });
});
module.exports = router;
