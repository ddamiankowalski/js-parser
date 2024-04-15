const jsonSample = '{ "q": [[23, 19, 10, 10], [19, 20, 20 , 20], [10, 24, 21, 10]] }';
const csvSample = "q[XAAUSD, 23, 19, 10, 10][XAAUSD, 2 0, 20 , 20][XAAUSD, 24, 21, 10]";

let jsonArr = [];
let csvArr = [];

const parseCSV = csv => {
    let length = csv.length;

    let value = '';
    let result = [];

    for(let i = 0; i < length; i++) {
        let char = csv[i];

        if(char === ' ') continue;

        if(char === '[') {
            for (;csv[i] !== ']'; i++)
                value += char;

            result.push(value);
            value = '';
        }
    }

    return value;
} 

for (let i = 0; i < 1000000; i++) {
    jsonArr.push(jsonSample);
}

console.time();
jsonArr.forEach(json => JSON.parse(json));
console.timeEnd();

for (let i = 0; i < 1000000; i++) {
    csvArr.push(csvSample);
}

console.time();
csvArr.forEach(csv => {
    const res = parseCSV(csv);
});
console.timeEnd();