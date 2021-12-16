'use strict'
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const router = require("./routes/rout");
const app = express();
const PORT = process.env.PORT
app.use(express.json());
function start() {
    app.listen(PORT, () => { console.log(`listning to ${PORT}`); })
}
app.use(cors())
app.get('/',(req,res)=>{
    console.log('===========');
    res.send('hello from /')
})

app.use(router)

module.exports = {
    start,
    app
}