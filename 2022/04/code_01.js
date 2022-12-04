const fs = require('fs')

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .reduce((counter, line) => {
            const [first, second] = line.split(',')
            const [a, b] = first.split('-')
            const [c, d] = second.split('-')
            const pairContains = (+a <= +c && +b >= +d) || (+a >= +c && +b <= +d)

            if(pairContains) {
                return counter + 1
            }

            return counter
        }, 0)
})
