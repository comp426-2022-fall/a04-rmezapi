#!/usr/bin/env node

// roll dice

export function roll(sides, dice, rolls){
    let i = 0
    
    const results = []
    while (i < rolls){
        let sum = 0
        let u = 0
        while (u < dice){
            sum += (Math.ceil(Math.random()*sides))
            u++
        }
        results.push(sum);
        i++;
    }
    return {"sides":sides,"dice":dice,"rolls":rolls,"results":results};
}