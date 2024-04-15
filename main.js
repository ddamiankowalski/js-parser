const jsonSample = '{ "q": [[23, 19, 10, 10], [19, 20, 20 , 20], [10, 24, 21, 10]] }';
const csvSample = "q[XAAUSD, 23, 19, 10, 10][19, 2 0, 20 , 20][10, 24, 21, 10]";

let jsonArr = [];
let csvArr = [];

const parseCSV = csv => {
    let length = csv.length;
    let result = {};

    let pointer = 0;
    let value = '';

    for(let i = 0; i < length; i++) {
        let char = csv[i];

        if(char === ' ' || char === '\t' || char === '\n') continue;
        
        if(char === 'q') {
            result['type'] = 'quotation';
            continue;
        }

        if(char === '[') {
            i++;
            char = csv[i];

            while(char !== ']') {
                if(char === ',') {
                    result[pointer] = value;
                    pointer++;
                    value = '';

                    i++;
                    char = csv[i];
                    continue;
                }

                if(char === ' ' || char === '\t' || char === '\n') {
                    i++;
                    char = csv[i];
                    continue;
                };

                value += char;
                i++;
                char = csv[i];
            }

            pointer = 0;
            value = '';
        }
    }

    return result;
} 

for (let i = 0; i < 1000000; i++) {
    jsonArr.push(jsonSample);
}

console.time();
jsonArr.forEach(json => JSON.parse(json));
console.timeEnd();

for (let i = 0; i < 100; i++) {
    csvArr.push(csvSample);
}

console.time();
csvArr.forEach(csv => {
    const res = parseCSV(csv);
    console.log(res)
});
console.timeEnd();