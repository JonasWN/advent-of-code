const fs = require('fs')

const lowercase = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65).toLowerCase())
const capital = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))
const priority = [...lowercase, ...capital]

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .reduce((acc, line) => {
            const compartment_01 = line.substring(0, line.length / 2).split('')
            const compartment_02 = line.substring(line.length / 2, line.length).split('')
            const [duplicatedLetter] = compartment_01.filter((n) => compartment_02.includes(n))

            return acc + prioity.indexOf(duplicatedLetter) + 1
        }, 0)
})
