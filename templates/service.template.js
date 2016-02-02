/**
 * A basic starter template for an angular service
 * @see https://github.com/johnpapa/angular-styleguide for additional details
 */

(function() {    

    'use strict';  

    angular
        .module('<%= appName %>')
        .factory('<%= serviceName %>Service', <%= serviceName %>Service);

    <%= serviceName %>Service.$inject = ['$http', 'logger'];

    function <%= serviceName %>Service($http, logger) {

        return {
            getData: getData;
        };

        function getData() {
            
            return $http.get('/api/something')
                .then( function( res ) { 
                  return res.data;
                })
                .catch( function( err ) { 
                  logger.error('Error:' + error.data);
                });
        }
    }
})(); 
