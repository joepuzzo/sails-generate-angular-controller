/**
 * Module dependencies
 */

var sailsgen = require('sails-generate'),
    path = require('path');

//
// This script exists so we can run our generator
// directly from the command-line for convenience
// during development.
//

var scope = {
    generatorType: 'controller',
    rootPath: process.cwd(),
    modules: {
        'controller': path.resolve(__dirname, '../Generator.js')
    },

    // For the NEW generator we're generating:
    generatorName: process.argv[2],
    args: [process.argv[2], process.argv[3], process.argv[4]]
};
sailsgen(scope, function (err) {
    if (err) throw err;

    // It worked.
    console.log('Done.');
});


