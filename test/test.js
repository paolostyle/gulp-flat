const fs = require('fs');
const flatten = require('../index.js');
const Vinyl = require('vinyl');

let inputFile, outputFile, mockedFile;

beforeEach(() => {
    inputFile = fs.readFileSync('test/jsons/input.json');
    outputFile = fs.readFileSync('test/jsons/output.json');
    mockedFile = new Vinyl({
        contents: inputFile
    });

    flatten().write(mockedFile);
});

test('mock should be buffer', () => {
    expect(mockedFile.isBuffer()).toBeTruthy();
});

test('should properly flatten the json file', function() {
    expect(mockedFile.contents).toEqual(outputFile);
});
