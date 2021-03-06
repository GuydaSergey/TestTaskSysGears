const util = require('../util');
let in_data = require('../Task2/in_data.json');
const GrowingPacker = require("jakes-gordon-Growing-Packer");

/*  
    После поиска решения данной задачи я пришел к мнению использовать библиотекув открытом доступе 
    и действенный алгоритм Джейка Гордона "Алгоритм двоичного дерева для 2D упаковки".
    Это очень простое бинарное дерево основанное на алгоритме упаковки в контейнеры, которые инициализируются с фиксированной шириной и высотой.
    Лучшие результаты достигаются, когда входные блоки сортируются по высоте, а еще лучше при сортировке по максимальной величине (ширина, высота).
*/

function assemblyResObject(pack, rectangles) {
    let temp = {
        area_width: pack.width,
        area_height: pack.height,
        rectangles: []
    };
    rectangles.forEach(element => {
        temp.rectangles.push({
            position: {
                x: element.x,
                y: element.y
            },
            size: {
                width: element.width,
                height: element.height

            }
        })
    });

    return temp;
};

function renameKeys(masObj, newKeys) {
    let keyValues;
    let temp = [];
    masObj.forEach(obj => {
        keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return {
                [newKey]: obj[key]
            };
        });
        temp.push(Object.assign({}, ...keyValues));

    })

    return temp;
}

module.exports = () => {
    try {
        let packer = new GrowingPacker({
            sortMethod: 'width'
        });
        in_data = renameKeys(in_data, {
            width: "w",
            height: "h"
        });
        let pack = packer.pack(in_data);
        let rectang = pack.rectangles();
        util.showSaveResult(assemblyResObject(pack, rectang), __dirname);
        return JSON.stringify(assemblyResObject(pack, rectang));
    } catch (err) {
        console.log(err);
    }
}