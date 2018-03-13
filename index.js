var through = require('through2');
var detectIndent = require('detect-indent');
var flattenBase = require('flat');
var unflattenBase = require('flat').unflatten;

module.exports = flatten;
flatten.flatten = flatten;
flatten.unflatten = unflatten;

var PLUGIN_NAME = 'gulp-flat';

function flatten(options) {
    var flat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        if (file.isBuffer()) {
            var indent = detectIndent(file.contents.toString()).indent || '  ';
            var parsedJson = JSON.parse(file.contents);
            var transformedObj = flat ? flattenBase(parsedJson, options) : unflattenBase(parsedJson, options);
            var flatJson = JSON.stringify(transformedObj, null, indent);
            file.contents = new Buffer(flatJson);
        }

        this.push(file);

        callback();
    });
}

function unflatten(options) {
    return flatten(options, false);
}