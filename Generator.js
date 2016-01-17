/**
 * Module dependencies
 */

var util   = require('util');
var _      = require('lodash');
var path   = require('path');
var fs     = require('fs');
_.defaults = require('merge-defaults');
_.str = require('underscore.string');


/*-------------- Process the arguments before wes start anything ------------*/

// Used for optional parameters
var params = {};

process.argv.forEach(function (val, index, array) {
        switch( val ) {
            case "--directive":
                params.directive = true;
                break;
            case "--service":
                params.service = true;
                break;
            case "--add-service":
                params.add_service = true;
                break;
            case "--shared": 
                params.shared = true; 
                break;
            case "-h":
            case "--help":
                USAGE();
                break;
            default: 
        }
});


/*---------------------- Export sails generator objects ----------------------*/

/**
 * sails-generate-angular-controller
 *
 * Usage:
 * `sails generate angular-controller`
 *
 * @description Generates a angular-controller
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

   before: function (scope, cb) {

        /*------------------------ Basic validations -------------------------*/

        // scope.args are the raw command line arguments.
        //
        // e.g. if someone runs:
        // $ sails generate angular-controller user find create update
        // then `scope.args` would be `['user', 'find', 'create', 'update']`
        if (!scope.args[0]) {
          //return cb( new Error('Please provide a name for this angular-controller.') );
          USAGE();
        }

        if(!scope.args[1]) { 
          //return cb( new Error('Please provide a destinaation folder for this angular-controller.') );
          USAGE(); 
        }
     
        // scope.rootPath is the base path for this generator
        //
        // e.g. if this generator specified the target:
        // './Foobar.md': { copy: 'Foobar.md' }
        //
        // And someone ran this generator from `/Users/dbowie/sailsStuff`,
        // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
        if (!scope.rootPath) {
          return cb( INVALID_SCOPE_VARIABLE('rootPath') );
        }

        ///////////////////////////////////////////////////////////////////
        /*
         * The following code was taken from the controller-angular generator 
         * github link: https://github.com/chiefy/sails-generate-controller-angular
         */ 

        // Check that we're in a valid sails project
        var pathToPackageJSON = path.resolve(scope.rootPath, 'package.json');
        var package, invalidPackageJSON;
        try {
            package = require(pathToPackageJSON);
        } catch (e) {
            invalidPackageJSON = true;
        }

        _.defaults(scope, {
            appName: package.name
        });

        if (invalidPackageJSON) {
            return cb.invalid('Sorry, this command can only be used in the root directory of a Sails project.');
        }
        //////////////////////////////////////////////////////////////////


        /*-------------------- Define any scope variabeles ---------------------*/
        // Add stuff to the scope for use in our templates:

        // Default value for target directory 
        scope.target_dir = params.shared ? "shared" : "components";

        // Decide the output filename for use in targets below:
        scope.filename = scope.args[0];

        // The output folder name
        scope.foldername = scope.args[1];

        // Attach defaults
        _.defaults(scope, {
          createdAt: new Date(), 
          ctrl_as: scope.filename, //TODO lowercase this!
          controllerName: _.str.capitalize(scope.filename),
          serviceName: _.str.capitalize(scope.filename),
          directiveName: scope.filename,
          ng_filename_controller: scope.filename + '-controller.js', 
          ng_filename_html: scope.filename + '-view.html',
          ng_filename_routes: scope.filename + '-routes.js',
          ng_filename_service: scope.filename + '-service.js',
          ng_filename_directive: scope.filename + '-directive.js' 
        });

        // When finished, we trigger a callback with no error
        // to begin generating files/folders as specified by
        // the `targets` below.
        cb();
  },


  /**
   * The files/folders to generate.
   * @type {Object}
   * Note: Normally there would be an object defined inline here but I 
   * moved it to a function to allow optional files.
   */
  targets: define_targets( params ), 

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};




/**
 * Function used to define optional targets
 */
function define_targets( params ){

    var targets = { 
        // Usage:
        // './path/to/destination.foo': { someHelper: opts }

        // Creates a dynamically-named file relative to `scope.rootPath`
        // (defined by the `filename` scope variable).
        //
        // The `template` helper reads the specified template, making the
        // entire scope available to it (uses underscore/JST/ejs syntax).
        // Then the file is copied into the specified destination (on the left).
        // Example: './:filename': { template: 'example.template.js' },

        // Creates a folder at a static path
        // Example: './hey_look_a_folder': { folder: {} }
    };


    // Dont add controller or html page if we are just adding a service
    if( !params.add_service && !params.directive ) { 
        targets['./assets/app/:target_dir/:foldername/:ng_filename_controller'] = { 
            template: 'controller.template.js' 
        };
        targets['./assets/app/:target_dir/:foldername/:ng_filename_html'] = { 
            template: 'index.template.html' 
        };
    }
 
    // Use optional arguments to create other files and folders for directive
    if( params.service || params.add_service ) { 
        targets['./assets/app/:target_dir/:foldername/:ng_filename_service'] = { 
            template: 'service.template.js' 
        }; 
    }

    // Use optional arguments to create other files and folders for service
    if( params.directive ) { 
        targets['./assets/app/:target_dir/:foldername/:ng_filename_directive'] = { 
            template: 'directive.template.js' 
        }; 
    }


    return targets; 
}



/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "angular-controller":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-angular-controller`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}

function USAGE( ) { 
    console.log("Usage: sails generate angular-controller <name> <folder> [options]");
    console.log("\nOptions: ");
    console.log("  -h, --help \t print usage information");
    console.log("  --shared \t use this to put files into the shared directory");
    console.log("  --service \t create a service in additon to a controller and view");
    console.log("  --add-service  use this to add a service if you have already created a controller");
    console.log("  --directive \t create a directive");
    console.log("\nDescription: Run this generator from within root directory of your sails application");
    process.exit();
}
