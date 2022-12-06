const fs = require('fs')

const marker = 14
const slice = marker - 2

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('')
        .reduce((acc, value, index) => {
            const solved = typeof(acc) === "number"
            const unique = new Set(`${acc}${value}`).size === marker
            const line = !solved && `${acc.slice(-slice)}${value}`

            if(solved) {
                return acc
            }

            if(unique) {
                return index + 1
            }

            return line
        }, '')
})
