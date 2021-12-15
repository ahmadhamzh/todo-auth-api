
'use strict'
const express = require('express');
const { user } = require('../models/index');
const { todo } = require('../models/index');
console.log(todo,'------------------------------');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('../middelware/basickauth');
const barearAuth = require('../middelware/barear');
const acl = require('../middelware/acl');

router.post('/signUp', async (req, res) => {
    try {        
        console.log(req.body,'=================');
       req.body.password = await bcrypt.hash(req.body.password, 5)       
        let record = await user.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        throw new Error(error.message)
    }
})

router.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.user);
})

router.get('/todo', barearAuth, acl('read'), async (req, res) => {
    try {
        let recordId = await todo.findAll({ })
        res.status(200).send(recordId);
    } catch (error) {
        throw new Error(error.message)
    }
})

router.post('/todo', barearAuth, acl('create'), async (req, res) => {
    try {        
        console.log(todo,'======================');
        let record = await todo.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        throw new Error(error.message)
    }
})

router.put('/todo/:id', barearAuth, acl('update'), async (req, res) => {
    console.log(req.body);
    let recordObj = req.body
    let id = req.params.id
    let recordId = await todo.findOne({ where: { id } })
    let updateRecord = await recordId.update(recordObj);
    let response = await todo.findAll({ })
    res.status(201).json(response);
})


router.delete('/todo/:id', barearAuth, acl('delete'), async (req, res) => {
    let id = parseInt(req.params.id)
    let deletedRecord = await todo.destroy({ where: { id } });
    let recordId = await todo.findAll({ })
    res.status(201).json(recordId);
})


module.exports = router