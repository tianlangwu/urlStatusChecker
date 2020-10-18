fs = require('fs');

const readUrlFilter = (file) => {
    return new Promise((resolve, reject)=>{
        fs.readFile(file, (err, data) => {
        
        if (err) reject("error in opening filter file.");

        resolve(data.toString().split("\n").filter(u => (u.startsWith("http://") || u.startsWith("https://"))));
        
        })
    })
}

module.exports = readUrlFilter;