#!/usr/bin/env node

import minimist from "minimist"
import { roll } from "./lib/roll.js"
import express from "express"

const args = minimist(process.argv.slice(2))
const app = express()
const port = args.port || 5000
let sides = 0
let dice = 0
let rolls = 0
let results = {}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.status(404).send("404 NOT FOUND")
    next()
})

app.get('/app/', (req, res, next) => {
    console.log("200 OK")
    res.status(200).send("200 OK")
    next()

})

app.get('/app/roll/', (req, res, next) => {
    results = {
        sides: 6,
        dice: 2,
        rolls: 1,
        results: roll(6, 2, 1)
    }
    console.log(results)
    res.status(200).json(results)

    next
})

app.post('/app/roll/', (req, res, next) => {
    sides = req.body.sides || 6
    dice = req.body.dice || 2
    rolls = req.body.rolls || 1
    results = {
        sides: sides,
        dice: dice,
        rolls: rolls,
        results: roll(sides, dice, rolls)
    }
    console.log(results)
    res.status(200).json(results)
    next()

})

app.post('/app/roll/:sides/', (req, res, next) => {
    sides = req.params.sides
    dice = req.body.dice || 2
    rolls = req.body.rolls || 1
    results = {
        sides: sides,
        dice: dice,
        rolls: rolls,
        results: roll(sides, dice, rolls)
    }
    console.log(results)
    res.status(200).json(results)
    next
})

app.post('/app/roll/:sides/:dice/', (req, res, next) => {
    sides = req.params.sides
    dice = req.params.dice
    rolls = req.body.rolls || 1
    results = {
        sides: sides,
        dice: dice,
        rolls: rolls,
        results: roll(sides, dice, rolls)
    }
    console.log(results)
    res.status(200).json(results)
    next
})

app.post('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
    results = {
        sides: req.params.sides,
        dice: req.params.dice,
        rolls: req.params.rolls,            
        results: roll(req.params.sides, req.params.dice, req.params.rolls) 
    }
    res.status(200).json(results)
    next
})

app.listen(port, () => {
    console.log("Server listening on port: " + port + "\n")
})

