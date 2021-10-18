const fs = require('fs')
const path = require('path')

const { argv } = process;
const [, , filename] = argv
const reENV = /(?<key>.+[a-zA-Z]+)\s=\s(?<value>.+)/g
const reENVneg = !/(?<key>.+[a-zA-Z]+)\s=\s(?<value>.+)/g
const reINI = {
    section : /(?<sec>[[a-zA-Z].+])/g,
    content : /(?<key>.+[a-zA-Z]+)=(?<value>.+)/g
}
let result

if (filename == undefined) {
    throw new Error('There is no argument')
}

const f = fs.readFileSync(filename, 'utf-8')
filenameB = path.basename(filename, path.extname(filename))

// Fonction de conversion
// result.groups.key|value pour récupérer le contenu des groupes 

function parseINI (filenameP_ini) {
    INIconverted = {}
    fsplit = f.split('\r\n')
    let Csec
    for (var i = 0; i < fsplit.length; i++) {
        if (reINI.section.test(fsplit[i])) {
            Csec = fsplit[i].replace('/\W/g','')
        } else {
            while(result = reINI.content.exec(fsplit[i])) {
                if (!INIconverted[Csec]) INIconverted[Csec] = {}
    
                INIconverted[Csec][result.groups.key] = result.groups.value
            }

        }
    }
    fs.writeFileSync(filenameB + '.converted.json', JSON.stringify(INIconverted,null,3))
}

function parseENV (filenameP_env) {
    ENVconverted = {}
    if (reENVneg.exec(f)) throw new Error('le contenu du fichier est érroné')
    while (result = reENV.exec(f)) {
        ENVconverted[result.groups.key] = result.groups.value
    }
    console.log(ENVconverted)
    //console.log(reENV.exec(fs.readFileSync(filename, 'utf-8')))
    fs.writeFileSync(filenameB + '.converted.json', JSON.stringify(ENVconverted,null,3)) //stringify ne fonctionne pas
}

// le programme de test

if (path.extname(filename) == '.ini') {
    parseINI (filename)
}
else if (path.extname(filename) == '.env') {
    parseENV (filename)
}
else {
    throw new Error('file extension is either nonexistant or not supported')
}