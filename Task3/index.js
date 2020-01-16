const util = require('../util');
const in_data = require('../Task3/in_data.json');
const algorithm = require('../Task3/genAlgorithm');

function assemblyResObject(res) {
    let temp = {
        main_thruster: [],
        secondary_thruster: [],
        delta_velocity: res.delta_velocity
    };
    res.thruster.forEach((el, ind) => {
        if (ind % 2 === 0)
            temp.main_thruster.push(el);
        else
            temp.secondary_thruster.push(el);

    })
    return temp;
};

module.exports = () => {
    try {
        let res = algorithm(in_data.corrections, in_data.cells);
        util.showSaveResult(assemblyResObject(res), __dirname);
        return assemblyResObject(res);
    } catch (err) {
        console.log(err);
    }
}