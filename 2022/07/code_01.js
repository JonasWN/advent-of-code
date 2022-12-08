const fs = require('fs')

const max_size = 100000

let currentDirectory = ''

const changeDirectory = (directory) => {
    switch(directory) {
        case('/'):
        currentDirectory = '#'
        break
        case('..'):
        const [last, ...rest] = currentDirectory.split('/').reverse()
        currentDirectory = currentDirectory.slice(0, -(last.length + 1))
        break
        default:
        currentDirectory = currentDirectory + '/' + directory
    }
}

let folders = {

}

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const solution = data.trim()
        .split('\n')
        .reduce((acc, line, index, arr) => {
            const [name, command, execute] = line.split(' ')
            const isCommand = line.includes('$')
            const isChangingDirectory = command === "cd"

            if(isChangingDirectory) {
                changeDirectory(execute)
                
                if(!folders[currentDirectory]) {
                    folders[currentDirectory] = 0
                }

                return 0
            }

            if(!isNaN(name)) {
                const updatedFolders = Object.entries(folders).reduce((acc, folder) => {
                    const [key, value] = folder

                    if(currentDirectory.includes(key)) {
                        return {
                            ...acc,
                            [key]: value + +name
                        }
                    }

                    return {
                        ...acc,
                        [key]: value
                    }
                }, {})

                folders = updatedFolders

                console.log(folders, currentDirectory)
                if(index === arr.length - 1) {
                    const sum = Object.values(folders).filter((folderSize) => folderSize < max_size)
                            .reduce((a, v)=> a + v)

                    return sum
                }

                return acc + +name
            }

            return acc
        }, 0)

        console.log(solution)
})
