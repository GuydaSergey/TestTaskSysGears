const fs = require("fs");
const path = require("path");

let in_data = require('../Task2/in_data.json');
const GrowingPacker  = require("jakes-gordon-Growing-Packer");


function assemblyResObject(pack , rectangles){
    let temp = {
        area_width : pack.width,
        area_height : pack.height,
        rectangles : []
    };
    rectangles.forEach(element => {
        temp.rectangles.push({
            position:{ 
                x : element.x,
                y : element.y 
            },
            size: {
                width : element.width,
                height : element.height

            }
        })
    });
       
    return temp;
};

function renameKeys(masObj, newKeys) {
    let keyValues ;
    let temp = [];
    masObj.forEach(obj =>{
        keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
          });
          temp.push(Object.assign({}, ...keyValues));
      
    })
   
    return temp ;
}

module.exports = () =>{
    let packer = new GrowingPacker({sortMethod:'width'});
    in_data = renameKeys(in_data,{width:"w",height:"h"});
    let pack = packer.pack(in_data);    
    let rectang = pack.rectangles();
    console.log(assemblyResObject(pack, rectang));   
      fs.writeFile(path.resolve(__dirname, 'out_data.json'), JSON.stringify(assemblyResObject(pack, rectang)), (error) => {
          if(error) console.log(error);
      })
  }