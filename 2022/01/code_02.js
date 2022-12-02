const fs = require('fs')

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const [a, b, c] = data.split('\n\n')
        .map(n => n.split('\n')
        .reduce((a, v) => a + +v, 0))
        .sort((a, b) => b - a)

    const solution = a + b + c
    console.log(solution)
})
