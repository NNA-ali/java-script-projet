//const http = require('http');
//let app = express();
const express = require('express');
let app = express();
const Liste = require('../../../data/liste');
let port = 3000;
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/livre';
let promise = mongoose.connect(uri);
const Livre = require('../../../model/livre.model');

promise.then((db) => {
    console.log('DB connected');
    app.listen(port, () => {
        console.log(`Listening on port ${port} !`);
    });
});



// lien
app.use('/pages', express.static('./client/pages'));
app.use('/assets', express.static('./client/assets'));
app.use(require('express').json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/liste', (req, res) => {
    res.send(Liste);
});
app.post('/livre', (req, res) => {
    let newLivre = new Livre(req.body);
    newLivre.save()
        .then((obj) => {
            return res.send(obj);
        })
        .catch((err) => {
            console.log('Error :',  err);
            return res.sendStatus(500);
        });
});

app.get('/livre', (req, res) => {
    Livre.find({})
        .then((obj) => {
            return res.send(obj);
        })
        .catch((err) => {
            console.log('Error :', err);
            return res.sendStatus(500);
        });
});

app.get('/livre/:id', (req, res) => {
    console.log(req.params)
    Livre.findOne({_id: req.params.id})
    .then ((obj) => {
        return res.send(obj);
    })
      .catch((err) => {
        console.log('Error', err);
        return res.sendStatus(500);
      })
    })
 

app.put('/livre/:id', (req, res)  => {
    Livre.findOneAndUpdate({_id: req.params.id},  req.body, {new: true, upsert: true, setDefaultsOnInsert: true,
    runValidators:true})
    .then((obj) => {
        return res.send(obj);
    })
    .catch((err) =>{
        console.log('Error :', err);
        return res.sendStatus(500);
    })
});

app.delete('/livre/:id', (req,res) => {
    Livre.deleteOne({_id: req.params.id})
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Error :', err);
        res.sendStatus(500)
    });
});