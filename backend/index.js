const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())// to use the response body 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/search', require('./routes/search'));
app.use('/api/producthistory', require('./routes/producthistory'));

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})