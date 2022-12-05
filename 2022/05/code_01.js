const fs = require('fs')

const table = {
}

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const [drawing, instructions] = data.split("\n\n")
    const [remove, ...trimmedDrawing] = drawing.split("\n").reverse()

    const decorateTable = trimmedDrawing.reverse()
        .map((t) => t.match(/.{1,4}/g))
        .forEach((line) => {
            line.map((line) => line.trim().substring(1, 2))
            .forEach((crate, i) => {
                const id = i + 1
                const isEmptyCrate = !crate.length
                const tableCrateSlotIsEmpty =!table[id]

                if(isEmptyCrate) {
                    return
                }

                if(tableCrateSlotIsEmpty) {
                    table[id] = [crate]
                    return
                } 

                table[id].unshift(crate)
            })
        })

    const rearrangement = instructions.split("\n")
        .map((line) => {
            if(!line.length > 0) {
                return
            }

            const [_,move, __, from ,___, to] = line.split(' ')
            const add = table[from].slice(table[from].length - +move, table[from].length).reverse()
            table[from].splice((table[from].length - +move), table[from].length)
            table[to] = [...table[to], ...add]
        })

    
    const solution = Object.values(table).reduce((acc, value)=> {
        const [answer] = value.reverse()

        return `${acc}${answer}`
    }, [])
})
