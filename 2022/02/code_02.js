const fs = require('fs')

const loss = 0
const draw = 3
const win = 6

const rock = 1
const paper = 2
const scissors = 3

const scores = {
    'A X': loss + scissors,
    'A Y': draw + rock,
    'A Z': win + paper,
    'B X': loss + rock,
    'B Y': draw + paper,
    'B Z': win + scissors,
    'C X': loss + paper,
    'C Y': draw + scissors,
    'C Z': win + rock,
}

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .map(j => +scores[j])
        .reduce((a, v) => a + v)
})


