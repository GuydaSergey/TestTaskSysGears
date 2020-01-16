const rule = require('../Task1/rule_convert.json');
const in_data = require('../Task1/in_data.json');
const convert = require('../Task1/convert');
const util = require('../util');

function assemblyResObject(unit, res) {
    return {
        unit: unit,
        value: res
    }
};

module.exports = () => {
    try {
        let res = convert(in_data, rule);
        util.showSaveResult(assemblyResObject(in_data.convert_to, res), __dirname);
        return assemblyResObject(in_data.convert_to, res);
    } catch (err) {
        console.log(err);
    }
}