const fs = require('fs');
const flatten = require('../index.js');
const Vinyl = require('vinyl');

let inputFile, outputFile, mockedFile;

beforeAll(() => {
    inputFile = fs.readFileSync('test/jsons/input.json');
    outputFile = fs.readFileSync('test/jsons/output.json');
    corruptedFile = new Vinyl({
        contents: new Buffer('{should: "throw";}')
    });
    mockedFile = new Vinyl({
        contents: inputFile
    });

    flatten().write(mockedFile);
});

test('mock should be buffer', () => {
    expect(mockedFile.isBuffer()).toBeTruthy();
});

test('should properly flatten the json file', () => {
    expect(mockedFile.contents).toEqual(outputFile);
});

test('should throw on illegal JSON', () => {
    expect(() => flatten().write(corruptedFile)).toThrow();
});
