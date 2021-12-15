'use strict'
const express = require('express');
require('dotenv').config();
const router = require("./routes/rout");
const app = express();
const PORT = process.env.PORT
app.use(express.json());
function start() {
    app.listen(PORT, () => { console.log(`listning to ${PORT}`); })
}

app.get('/',(req,res)=>{res.send('hello from /')})

app.use(router)

module.exports = {
    start,
    app
}