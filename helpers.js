const fs = require('fs');

module.exports.setHeaders = function (data){
var headers = '';
    for(let key in data){
        if(!Array.isArray(data[key])) headers += key + ','
    }
    var ch = headers.slice(0,headers.length - 1)
    fs.readFile('csv-data', (err, txt) => {
        if(err){
            throw new Error('there was an error while reading data')
        }
        else{
            fs.writeFile('csv-data', txt+ch+"\n", err => {
                if(err) throw new Error('there was an error while writing data')
            })
        }
    })
};

module.exports.setBody = function(data){
    var result = '';
    function prepare(data) {
        for(let key in data){
            if(!Array.isArray(data[key])) {
                result += data[key]+',';
            }
            if(Array.isArray(data[key])){
                result = result.slice(0,result.length - 1)
                result += "\n"
                for(let i = 0; i < data[key].length; i++){
                    prepare(data[key][i])
                }

            }
        }
    }
    prepare(data);
    fs.readFile('csv-data', (err, txt) => {
        if(err){
            throw new Error('there was an error while reading data')
        }
        else{
            fs.writeFile('csv-data', txt+result, err => {
                if(err) throw new Error('there was an error while writing data')
                res.send(txt)
            })
        }
    })
};