// //Creating the JSON from CSV


// // Reading the file using default
// // fs npm package
// const fs = require("fs");
// csv = fs.readFileSync("./test.csv")
 
// // Convert the data to String and
// // split it in an array
// var array = csv.toString().split("\r");
 
// // All the rows of the CSV will be
// // converted to JSON objects which
// // will be added to result in an array
// let result = [];
 
// // The array[0] contains all the
// // header columns so we store them
// // in headers array
// let headers = array[0].split(", ")
 
// // Since headers are separated, we
// // need to traverse remaining n-1 rows.
// for (let i = 1; i < array.length - 1; i++) {
//   let obj = {}
 
//   // Create an empty object to later add
//   // values of the current row to it
//   // Declare string str as current array
//   // value to change the delimiter and
//   // store the generated string in a new
//   // string s
//   let str = array[i]
//   let s = ''
 
//   // By Default, we get the comma separated
//   // values of a cell in quotes " " so we
//   // use flag to keep track of quotes and
//   // split the string accordingly
//   // If we encounter opening quote (")
//   // then we keep commas as it is otherwise
//   // we replace them with pipe |
//   // We keep adding the characters we
//   // traverse to a String s
//   let flag = 0
//   for (let ch of str) {
//     if (ch === '"' && flag === 0) {
//       flag = 1
//     }
//     else if (ch === '"' && flag == 1) flag = 0
//     if (ch === ', ' && flag === 0) ch = '|'
//     if (ch !== '"') s += ch
//   }
 
//   // Split the string using pipe delimiter |
//   // and store the values in a properties array
//   let properties = s.split("|")
 
//   // For each header, if the value contains
//   // multiple comma separated data, then we
//   // store it in the form of array otherwise
//   // directly the value is stored
//   for (let j in headers) {
//     if (properties[j].includes(", ")) {
//       obj[headers[j]] = properties[j]
//         .split(", ").map(item => item.trim())
//     }
//     else obj[headers[j]] = properties[j]
//   }
 
//   // Add the generated object to our
//   // result array
//   result.push(obj)
// }
 
// // Convert the resultant array to json and
// // generate the JSON output file.
// let json = JSON.stringify(result);
// fs.writeFileSync('obj2.json', json);



// // Merging the two JSON together




//  const fs = require("fs");

// let o1 = fs.readFileSync('obj1.json');
// let obj1 = JSON.parse(o1);
//  let o2 = fs.readFileSync('output.json');
//  let obj2 = JSON.parse(o2);

// const result = {};
// let key;
// for (key in obj1) {
//   if(obj1.hasOwnProperty(key)){
//     result[key] = obj1[key];
//   }
// }

// for (key in obj2) {
//   if(obj2.hasOwnProperty(key)){
//     result[key] = obj2[key];
//   }
// }

// let newObj = JSON.stringify(result);

// fs.writeFileSync('newFile.json', newObj);

// let myArray = obj2.objects.ne_110m_admin_0_countries.geometries
// let myArray2 = 
// console.log(myArray);


// let obj = {
//     "1":"aa",
//     "2":"bb"
// };


// var newNum = "3";
// var newVal = "cc";


// obj[newNum] = newVal;

// console.log(obj);

const fs = require("fs");

let o1 = fs.readFileSync('BetterJSON-1.json');
let obj1 = JSON.parse(o1);
 let o2 = fs.readFileSync('obj1.json');
 let obj2 = JSON.parse(o2);


// for(item in obj1.Ticker){
//   console.log(obj1.Ticker);
// }

// for(var myTest in obj1.Ticker){
//   obj1.Ticker.;
// }
// console.log(obj1.Ticker);
//console.log(obj2.objects.ne_110m_admin_0_countries.geometries);
//console.log(obj2.objects.ne_110m_admin_0_countries.geometries.properties);
// for(var test in obj2.objects.ne_110m_admin_0_countries.geometries){
//   console.log(obj2.objects.ne_110m_admin_0_countries.geometries[test].properties.ISO_A3);
// }


for(var test2 in obj1.Exchange){ // test2 ends up being the ISO3 name, which is the key in the obj1.Ticker value
  for(var test in obj2.objects.ne_110m_admin_0_countries.geometries){ //test is a numeric value (wtf?) and 
    if(test2 == obj2.objects.ne_110m_admin_0_countries.geometries[test].properties.ISO_A3){
      //console.log("TEST");
      var myTick = "Tick"
      obj2.objects.ne_110m_admin_0_countries.geometries[test].properties[myTick] = obj1.Exchange[test2];
      console.log(obj2.objects.ne_110m_admin_0_countries.geometries[test].properties[myTick]);
    }
  }
}


for(var test2 in obj1.Price_Change){ // test2 ends up being the ISO3 name, which is the key in the obj1.Ticker value
  for(var test in obj2.objects.ne_110m_admin_0_countries.geometries){ //test is a numeric value (wtf?) and 
    if(test2 == obj2.objects.ne_110m_admin_0_countries.geometries[test].properties.ISO_A3){
      //console.log("TEST");
      var myTick = "Price_Change"
      obj2.objects.ne_110m_admin_0_countries.geometries[test].properties[myTick] = obj1.Price_Change[test2];
      console.log(obj2.objects.ne_110m_admin_0_countries.geometries[test].properties[myTick]);
    }
  }
}

let newJson = JSON.stringify(obj2);
fs.writeFileSync('updated.json', newJson);

// for(var test in obj1.Ticker){
//   console.log(test);
// }

// for(var test in obj1.Ticker){
//   console.log(obj1.Ticker[test]);
// }