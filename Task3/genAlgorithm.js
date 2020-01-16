let tempMas = [];
let countCheck = 0,
    checkDelta;
// Метод заполнения значений капсул в массив и добавление недостаюших (заполняются 0)
function addTemp(mas, length) {
    for (let i = 0; i < length * 2; i++) {
        if (i < mas.length)
            tempMas.push(mas[i]);
        else
            tempMas.push(0);
    }
}

class GenAlgoritm {

    constructor(arrCorrections) {
        this.countGen = arrCorrections.length * 2;
        this.popMaxSize = 25;
        this.agents = [];
        this.numGn = 0;
        this.testMas = arrCorrections;
    };
    // Повторяющийся шаг работы алгоритма (Удаление , Мутация , Подсчет )
    stepGa() {

        this.remoweWeakest(Math.ceil(this.popMaxSize / 2));
        this.numGn++;
        let maxIndex = this.agents.length;
        while (this.agents.length < this.popMaxSize) {

            if (Math.random() < 0.5) {
                let index = Math.floor(Math.random() * (maxIndex - 0) + 0);
                this.addMutant(index);
            } else {
                let index1 = Math.floor(Math.random() * (maxIndex - 0) + 0);
                let index2 = Math.floor(Math.random() * (maxIndex - 0) + 0);
                this.addChild(index1, index2);
            }
        }
        this.measureAgentAll();
    }
    // Проверка значений капсул в особи на соблюдение всех условий задачи. 
    checkAgentGen(mas) {
        let flag = true;
        let iter = 0;
        mas.forEach((el, ind) => {
            if (ind % 2 !== 0) {
                if ((el / 2) + mas[ind - 1] > this.testMas[iter]) {
                    flag = false;
                }
                iter++;
            } else if (ind % 2 === 0 && el > this.testMas[iter])
                flag = false;
        })
        return flag;
    }

    /*  Инициализация создание особей и заполнение популяции
        Особь - объект с свойствами :
            thruster - массив значений капсул размер равен размеру маневров умноженых на количество двигателей.
            delta_velocity - итоговое полученное приращение скорости в данном решении (особи).
    */ 
    initAgent() {
        while (this.agents.length < this.popMaxSize) {
            let pts = {
                thruster: [],
                delta_velocity: undefined
            };
            let mas = JSON.parse(JSON.stringify(tempMas));
            while (pts.thruster.length < this.countGen) {
                let index = +(Math.random() * mas.length - 1).toFixed();
                if (index < 0) index++;
                let temp = mas.splice(index, 1)[0];
                pts.thruster.push(temp);
            }
            if (this.checkAgentGen(pts.thruster))
                this.agents.push(pts);
            this.measureAgentAll();
        }
    };
    // Подсчет итоговое полученное приращение скорости у особи.
    measureAgent(agentIndex) {
        let pts = this.agents[agentIndex];
        this.agents[agentIndex].delta_velocity = pts.thruster.reduce(function (sum, cur, ind) {
            if (ind % 2 === 0)
                return sum + cur;
            else
                return sum + cur / 2;
        }, 0);
    }

    measureAgentAll() {
        for (let k = 0; k < this.agents.length; k++)
            this.measureAgent(k);
        this.sortAgent();
    }
    // Отбор - удаление слабых особей (неудачных решений). 
    remoweWeakest(WN) {
        this.measureAgentAll();
        while (this.agents.length > 0 && WN > 0) {
            WN--;
            this.agents.pop();
        }
    }
    // Мутация механизм изменения особи (перемешение значений капсул ) 
    addMutant(agentIndex) {
        let newAgent;
        while (true) {
            let index1 = Math.floor(Math.random() * this.countGen);
            let index2 = Math.floor(Math.random() * this.countGen);
            newAgent = JSON.parse(JSON.stringify(this.agents[agentIndex]));
            let temp = newAgent.thruster[index1];
            newAgent.thruster[index1] = newAgent.thruster[index2];
            newAgent.thruster[index2] = temp;
            newAgent.delta_velocity = undefined;
            if (this.checkAgentGen(newAgent.thruster)) break;
        }
        this.agents.push(newAgent);
        this.checkAgentGen(newAgent.thruster)
    }
    // Мутация - парождение патомков из двух рандомно выбраных особей .
    addChild(indexAgent1, indexAgent2) {
        let pts = [indexAgent1, indexAgent2];
        let child = {
            thruster: [],
            delta_velocity: undefined
        };
        let mas = JSON.parse(JSON.stringify(tempMas));
        while (child.thruster.length < this.countGen) {
            let parentIndex = Math.floor(Math.random() * 2);
            let genIndex = Math.floor(Math.random() * this.countGen);
            if (mas.includes(this.agents[pts[parentIndex]].thruster[genIndex])) {

                child.thruster.push(mas.splice(mas.indexOf(this.agents[pts[parentIndex]].thruster[genIndex]), 1)[0]);
            }
        }
        if (this.checkAgentGen(child.thruster))
            this.agents.push(child);
    }
    // Сортировка популяции так что-бы сильные особи были в начале популяции( масиве ).
    sortAgent() {
        this.agents.sort(function (a, b) {
            return b.delta_velocity - a.delta_velocity;
        });
    }
}
//Проверка и подсчет повтореный самых удачных решшений для остановки работы алгоритма 
function checkRes(popGen) {

    let flag = true;
    if (checkDelta === popGen[0].delta_velocity) {
        countCheck++
        if (countCheck >= popGen.length)
            flag = false;
    } else {
        checkDelta = popGen[0].delta_velocity;
        countCheck = 0;
    }
    return flag;
}


const algorithmGen = function (arrCorrections, arrCells) {

    try {
        addTemp(arrCells, arrCorrections.length)
        let gA = new GenAlgoritm(arrCorrections);
        gA.initAgent();
        while (checkRes(gA.agents)) {
            gA.stepGa();
            if (gA.numGn > 1000)
                break;
        }
        return gA.agents[0];
    } catch (er) {
        console.log(er);
    }

};

module.exports = algorithmGen;