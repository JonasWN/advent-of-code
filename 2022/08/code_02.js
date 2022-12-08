const fs = require('fs')

const splitIntoColumns = (line, index, rows) => line.split('').map((tree, i) => rows[i].charAt(index)).join('')
const treeViewRange = (list, length, tree) => list.findIndex((nextTree, index) => {
    if(!length) {
        return 0
    }
                    
    if(length === index + 1) {
        return index + 1
    }

    return nextTree >= tree
})

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const rows = data.trim().split('\n')
    const columns = rows.map((line, index) => splitIntoColumns(line, index, rows))

    const solution = rows.reduce((acc, line, index) => {
            const trees = line.trim().split('') 

            const scenicScore = trees.reduce((acc, tree, i) => {
                const left = [...rows[index].slice(0, i)].reverse()
                const right = [...rows[index].slice(i + 1)]
                const up = [...columns[i].slice(0, index)].reverse()
                const down = [...columns[i].slice(index + 1)]

                const leftViewRange = treeViewRange(left, left.length, tree) + 1
                const rightViewRange = treeViewRange(right, right.length, tree) + 1
                const upViewRange = treeViewRange(up, up.length, tree) + 1
                const downViewRange = treeViewRange(down, down.length, tree) + 1

                const scenicScores = leftViewRange * rightViewRange * upViewRange * downViewRange

                return Math.max(acc, scenicScores)
            })

            if(acc > scenicScore) {
                return acc
            }

            return scenicScore
        }, 0)
})
