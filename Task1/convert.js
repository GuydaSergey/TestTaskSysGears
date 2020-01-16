module.exports = (in_data, rule) => {
    try {
        let a = rule.find((el) => {
            return el.unit === in_data.convert_to
        });
        let b = rule.find((el) => {
            return el.unit === in_data.distance.unit
        });
        if (a === undefined || b === undefined)
            throw "Not rules";
        if (a.coefficient == 0 || a.coefficient == undefined) a.coefficient = 1;
        let res = (in_data.distance.value * b.coefficient / a.coefficient).toFixed(2);
        return res
    } catch (err) {
        console.log(err);
    }
}