const util = require('../util');
const in_data = require('../Task3/in_data.json');
const algorithm = require('../Task3/genAlgorithm');

/*
    Для решения данной задачи я использовал генетический алгоритм. На мой взгляд этот алгоритм лучшый для решение подобных задач. 
    Генетический алгоритм — это в первую очередь эволюционный алгоритм, другими словами, основная фишка алгоритма — скрещивание (комбинирование).
    Как несложно догадаться идея алгоритма наглым образом взята у природы. Так вот, путем перебора и самое главное отбора получается правильная «комбинация».
    Основные этапы алгоритма : Инициализаци - найти хоть какое то решение задачи, набор таких решений — популяция. Критерий отбора - сравнить разные решения для определения какое из них лучше.
    Отбор - удаление неудачные решений. Формирование новой популяции решений - восстановить численность нашей популяции решений. Мутация - механизм изменения решения 
    (Важно, чтобы изменения потенциально могли привести к оптимальному решению задачи).

*/

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