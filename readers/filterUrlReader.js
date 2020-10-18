fs = require('fs');

readUrlFilter = (file) => {
    fs.readFile(file, (err, data) => {
        
        if (err) return console.log("error in opening filter file.");

        var content = data.toString();
        console.log(content);
    })
}

