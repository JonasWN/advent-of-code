const fs = require('fs')

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .reduce((counter, line) => {
            const [first, second] = line.split(',')
            const [a, b] = first.split('-').map((n) => +n)
            const [c, d] = second.split('-').map((j) => +j)
            const rangeOverlaps = b >= c && a <= d

            if(rangeOverlaps) {
                return counter + 1
            }

            return counter
        }, 0)
})
