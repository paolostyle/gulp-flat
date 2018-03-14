const through = require('through2');
const detectIndent = require('detect-indent');
const PluginError = require('plugin-error');
const flat = require('flat');
const unflat = require('flat').unflatten;

const PLUGIN_NAME = 'gulp-flat';

function transformJson(options, unflatMode) {
    return through.obj((file, encoding, callback) => {
        if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
        }

        if (file.isBuffer()) {
            let indent = detectIndent(file.contents.toString()).indent || '  ';
            let parsedJson;
            try {
                parsedJson = JSON.parse(file.contents);
            } catch (error) {
                return callback(new PluginError(PLUGIN_NAME, error));
            }
            let transformedObj = unflatMode ? unflat(parsedJson, options) : flat(parsedJson, options);
            let flatJson = JSON.stringify(transformedObj, null, indent);
            file.contents = new Buffer(flatJson);
        }

        return callback(null, file);
    });
}

function flatten(options) {
    return transformJson(options, false)
}

module.exports = flatten;
flatten.flatten = flatten;
flatten.unflatten = options => transformJson(options, true);
