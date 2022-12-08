const fs = require('fs')

const max_size = 70000000
const requiredSpace = 30000000
const root = '~'

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const fileSystem = new Terminal(max_size, requiredSpace)
    const solution = data.trim()
        .split('\n')
        .reduce((acc, line, index, arr) => {
            const [fileSize, command, fileName, isFile, isChangingDirectory, isLastLine] = fileSystem.readLine(line, index, arr)

            if(isLastLine) {
                return fileSystem.makeRoomForUpdate()
            }

            if(isChangingDirectory) {
                fileSystem.changeDirectory(fileName)
            }

            if(isFile) {
                fileSystem.updateFolders(fileSize)
            }

            return acc + fileSize
        }, 0)

    console.log(solution)
})

class Terminal {
    constructor(max_size, required_space) {
        this.root = '~'
        this.navigate_back = '..'
        this.max_size = max_size
        this.required_space = requiredSpace
        this.current_directory = '',
        this.folders = {}
    }

    get_folders() {
        return this.folders
    }
    
    get_folder(folder) {
        return this.folders[folder]
    }

    get_root_folder_name() {
        return this.root
    }

    get_navigate_back_name() {
        return this.navigate_back
    }

    get_total_disk_space() {
        return this.max_size
    }

    get_file_sizes() {
        return this.folders[this.root]
    }

    get_available_space() {
        return this.max_size - this.get_file_sizes()
    }

    get_current_directory() {
        return this.current_directory
    }

    get_is_sub_folder(key) {
        return this.get_current_directory().includes(key)
    }

    getFoldersAsArray() {
        return Object.entries(this.get_folders())
    }

    getFolderIsCreated() {
        return !!this.get_folder(this.get_current_directory())
    }

    removeOutermostDirectory() {
        const [last, ...rest] = this.get_current_directory().split('/').reverse()
        
        return this.get_current_directory().slice(0, -(last.length + 1))
    }

    changeDirectory(directory) {
        switch(directory) {
            case('/'):
            this.current_directory = root
            break
            case('..'):
            this.current_directory = this.removeOutermostDirectory()
            break
            default:
            this.current_directory = this.get_current_directory() + '/' + directory
        }


        if(!this.getFolderIsCreated()) {
            this.addFolder()
        }
    }

    addFolder(folder = 0){
       this.folders[this.get_current_directory()] = folder
    }

    updateFolders(fileSize){
        const folderSizesUpdated = this.getFoldersAsArray()
            .reduce((acc, folder) => {
                const [key, value] = folder

                if(this.get_is_sub_folder(key)) {
                    return {
                        ...acc,
                        [key]: value + fileSize
                    }
                }

                return {
                    ...acc,
                    [key]: value
                }
            }, {})

       this.folders = folderSizesUpdated
    }

    makeRoomForUpdate() {
        const [sum] = Object.values(this.get_folders()).filter((folderSize) => (folderSize + this.get_available_space()) > this.required_space)
            .sort((a, b) => a - b)

        return sum
    }  

    readLine(line, index, arr) {
        const [name, command, folderName] = line.split(' ')
        const isChangingDirectory = command === "cd"
        const isFile = !isNaN(name)
        const isLastLine = index === arr.length - 1
        
        return [+name, command, folderName, isFile, isChangingDirectory, isLastLine]
    }
}
