const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Elimina el documento después de 1 día
    }
});

const myModel = mongoose.mongoose.model('Link-shortener', mySchema);

module.exports = myModel;