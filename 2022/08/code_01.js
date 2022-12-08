const fs = require('fs')

const splitIntoColumns = (line, index, rows) => line.split('').map((tree, i) => rows[i].charAt(index)).join('')

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const rows = data.trim().split('\n')
    const columns = rows.map((line, index) => splitIntoColumns(line, index, rows))

    const solution = rows.reduce((acc, line, index) => {
            const trees = line.trim().split('') 

            const treesInSight = trees.reduce((a, tree, i) => {
                const treeIsEdge = index === 0 
                    || index === rows.length - 1
                    || i === trees.length - 1
                    || i === 0
                
                if(treeIsEdge) {
                    return a + 1
                }

                const left = Math.max(...rows[index].slice(0, i))
                const right = Math.max(...rows[index].slice(i + 1))
                const up = Math.max(...columns[i].slice(0, index))
                const down = Math.max(...columns[i].slice(index + 1))

                const treeIsInSight = tree > left 
                    || tree > right
                    || tree > up 
                    || tree > down

                if(treeIsInSight) {
                    return a + 1
                }

                return a
            }, 0)
            
            return acc + treesInSight
        }, 0)
})
