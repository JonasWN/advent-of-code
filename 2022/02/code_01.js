const fs = require('fs')

const loss = 0
const draw = 3
const win = 6

const rock = 1
const paper = 2
const scissors = 3

const scores = {
    'A X': draw + rock,
    'A Y': win + paper,
    'A Z': loss + scissors,
    'B X': loss + rock,
    'B Y': draw + paper,
    'B Z': win + scissors,
    'C X': win + rock,
    'C Y': loss + paper,
    'C Z': draw + scissors,
}

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .map(j => +scores[j])
        .reduce((a, v) => a + v)
})
