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
    res
        .status(404)
        .send("404 NOT FOUND")
})

app.get('/app/', (req, res, next) => {
    console.log("200 OK")
    res
        .status(200)
        .send("200 OK")
    // return res.status(200)

})

app.get('/app/roll/', (req, res, next) => {
    results = roll(6, 2, 1)
    res
        .status(200)
        .json(results)
})


app.post('/app/roll/', (req, res, next) => {
    sides = parseInt(req.body.sides) || 6
    dice = parseInt(req.body.dice) || 2
    rolls = parseInt(req.body.rolls) || 1
    if (isNaN(sides) || isNaN(dice) || isNaN(dice)){
        res.status(404).send("404 NOT FOUND").end()
    }
    else {
        results = roll(sides, dice, rolls)
        res
            .set('Content-Type', 'application/json')
            .status(200).json(results)
    }
})

app.get('/app/roll/:sides/', (req, res, next) => {
    sides = parseInt(req.params.sides )
    dice = parseInt(req.body.dice) || 2
    rolls = parseInt(req.body.rolls) || 1
    if (isNaN(sides) || isNaN(dice) || isNaN(dice)){
        res.status(404).send("404 NOT FOUND").end()
    }
    else {results = roll(sides, dice, rolls)
        res
            .set('Content-Type', 'application/json')
            .status(200).json(results)
    }
    next()
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
    sides = parseInt(req.params.sides)
    dice = parseInt(req.params.dice)
    rolls = parseInt(req.body.rolls) || 1
    if (isNaN(sides) || isNaN(dice) || isNaN(dice)){
        res.status(404).send("404 NOT FOUND").end()
    }
    else {
        results = roll(sides, dice, rolls)
        res
            .set('Content-Type', 'application/json')
            .status(200).json(results).end()
    }
})

app.get('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
    sides = parseInt(req.params.sides) || 6
    dice = parseInt(req.params.dice) || 2
    rolls = parseInt(req.params.rolls) || 1
    if (isNaN(sides) || isNaN(dice) || isNaN(dice)){
        res.status(404).send("404 NOT FOUND").end()
    }
    else {
        results = roll(sides, dice, rolls)
        res
            .set('Content-Type', 'application/json')
            .status(200).json(results)
    }
})

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND')
  })

app.listen(port, () => {
    console.log("Server now running in port: ", port)
})