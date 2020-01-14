let tempMas = [];

function addTemp(count) {
    for (let i = 0; i < count; i++)
        tempMas.push(i + 1);
}

class GenAlgoritm {

    constructor(mas) {
        this.countGen = mas.length;
        this.popMaxSize = mas.length;
        this.agents = [];
        this.numGn = 0;
        this.provMas = mas;
    };

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


    initAgent() {
        while (this.agents.length < this.popMaxSize) {
            let pts = [];
            let mas = JSON.parse(JSON.stringify(tempMas));
            while (pts.length < this.countGen) {
                let temp = [];
                while (temp.length === 0) {

                    let index = +(Math.random() * 11 ).toFixed();
                    temp = mas.splice(index, 1);
                }
                pts.push(temp.pop());
            }

            this.agents.push({p: pts, size: 0});
        }
    };

    measureAgent(agentIndex) {
        let pts = this.agents[agentIndex].p;
        this.agents[agentIndex].size = this.provMas.reduce(function (sum, cur, ind) {
            let res = cur - pts[ind];
            if (res < 0)
                return sum + 0;
            return sum + res;
        }, 0);
    }

    measureAgentAll() {
        for (let k = 0; k < this.agents.length; k++)
            this.measureAgent(k);
        this.sortAgent();
    }

    remoweWeakest(WN) {
        this.measureAgentAll();
        while (this.agents.length > 0 && WN > 0) {
            WN--;
            this.agents.pop();
        }
    }

    addMutant(agentIndex) {

        let index1 = Math.floor(Math.random() * this.countGen);
        let index2 = Math.floor(Math.random() * this.countGen);

        let newAgent = JSON.parse(JSON.stringify(this.agents[agentIndex]));
        let temp = newAgent.p[index1];
        newAgent.p[index1] = newAgent.p[index2];
        newAgent.p[index2] = temp;
        newAgent.size = undefined;
        this.agents.push(newAgent);
    }

    addChild(indexAgent1, indexAgent2) {
        let pts = [indexAgent1, indexAgent2];
        let child = {p: [], size: undefined};
        while (child.p.length < this.countGen) {
            let parentIndex = Math.floor(Math.random() * 2);
            let genIndex = Math.floor(Math.random() * this.countGen);
            if (!child.p.includes(this.agents[pts[parentIndex]].p[genIndex])) {
                child.p.push(this.agents[pts[parentIndex]].p[genIndex]);
            }
        }

        this.agents.push(child);
    }

    sortAgent() {
        this.agents.sort(function (a, b) {
            return a.size - b.size
        });
    }
}

function provRes(popGen, provMas) {

    let flag = true;
    let prov = provMas.reduce(function (sum, curr) {
            return sum + curr;
        }, 0) - 55;

    popGen.forEach(function (i) {
        if (i.size === prov) {
            flag = false;
        }
    });
    return flag;
}


const algorithmGen = function (mas) {

    try {
        addTemp(mas.length);
        let gA = new GenAlgoritm(mas);
        gA.initAgent();
        while (provRes(gA.agents, mas)) {
            if (gA.numGn > 100)
                break;
            gA.stepGa();
        }
        console.log(gA.agents[0].p);
    } catch (er) {
        console.log(er);
    }

};

module.exports = algorithmGen;