const path = require("path");
const fs = require("fs");

showSaveResult = function (res, dir) {
    console.log(res);
    fs.writeFile(path.resolve(dir, 'out_data.json'), JSON.stringify(res), (error) => {
        if (error) console.log(error);
    })
}

module.exports = {
    showSaveResult
};