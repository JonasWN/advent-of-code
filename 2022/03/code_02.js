const fs = require('fs')

const splitEveryThirdLine= /(?=[\s\S])(?:.*\n?){1,3}/g
const lowerCase = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65).toLowerCase())
const upperCase = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))
const priority = [...lowerCase, ...upperCase]

const removeDuplicatedLetters = (line) => {
    const uniqueLetters= [...new Set(line)]

    return uniqueLetters.join('')
}

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .map((line) => removeDuplicatedLetters(line))
        .join("\n")
        .match(splitEveryThirdLine)
        .reduce((acc, lines) => {
            const [line_01, line_02, line_03] = lines.split('\n')
            const [letterCode] = line_01.split('').filter((n) => line_02.split('').includes(n))
                .filter((j) => line_03.split('').includes(j))

            return acc + priority.indexOf(letterCode) + 1
        }, 0)
})
