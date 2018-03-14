const fs = require('fs');
const flatten = require('../index.js');

test('flatten json', () => {
    let inputFile = fs.readFileSync('test/input/to-flat.json');
    flatten.write()

});