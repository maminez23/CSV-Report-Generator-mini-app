const fs = require('fs');

module.exports = function convert(data){
var headers = ''
    for(let key in data){
        headers += key + ','
    }
    var ch = headers.slice(0,headers.length - 1)
    fs.readFile('csv-data', (err, txt) => {
        if(err){
            throw new Error('there was an error while reading data')
        }
        else{
            fs.writeFile('csv-data', txt+ch, err => {
                if(err) throw new Error('there was an error while writing data')
            })
        }
    })
};