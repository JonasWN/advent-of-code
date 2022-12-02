const fs = require('fs')

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const [solution] = data.split('\n\n')
        .map(n => n.split('\n')
        .reduce((a, v) => a + +v, 0))
        .sort((a, b) => b - a)
    
    console.log(solution)
})
