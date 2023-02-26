const fs = require('fs');
const axios = require('axios');

function outputToFile(data, output) {
    if (output) {
        fs.writeFile(output, data, 'utf8', function (err) {
            if (err) {
                console.error(`Couldn't write ${output}: ${err}`);
                process.exit(1);
            }
        });
    }
    else {
        console.log(data);
    }
}

function cat(path, output) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else {
            outputToFile(data, output);
        }
    });
}

async function webCat(url, output) {
    try {
        let res = await axios.get(url);
        outputToFile(res.data, output);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let output;

if (process.argv[2].includes('--out')) {
    output = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}

if (path.includes('http')) {
    webCat(path, output);
}
else {
    cat(path, output);
}