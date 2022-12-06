const fs = require('fs')

const marker = 4
const slice = marker - 2

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('')
        .reduce((acc, value, index) => {
            const unique = new Set(`${acc}${value}`).size === marker
            const solved = typeof(acc) === "number"
            const line = !solved && acc.slice(-slice)

            if(solved) {
                return acc
            }

            if(unique) {
                return index + 1
            }

            return `${line}${value}`
        }, '')
})
