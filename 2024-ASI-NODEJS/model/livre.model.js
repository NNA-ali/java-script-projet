const mongoose = require('mongoose') ;


let livreShema = mongoose.Schema({
    nom: String,
    genre: String,
    pays: String,
    date: Date,
    
});

let Livre = mongoose.model('Livre', livreShema);

module.exports = Livre;