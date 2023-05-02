const mongoose = require('mongoose');
mongoose.set('strictQuery', true);// to handle some warning
// mongoose.connect('mongodb://127.0.0.1:27017/inotebook',{useNewUrlParser: true,useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    db.once('open', function () {
        console.log('connected to DB');
    });
}
module.exports = connectToMongo;