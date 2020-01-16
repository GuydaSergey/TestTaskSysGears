const fs = require("fs");
const path = require("path");

const in_data = require('../Task3/in_data.json');
const algorithm = require('../Task3/genAlgorithm');

module.exports = () => {
    let res = algorithm(in_data.corrections, in_data.cells);
    fs.writeFile(path.resolve(__dirname, 'out_data.json'), JSON.stringify(res), (error) => {
        if (error) console.log(error);
    })
}