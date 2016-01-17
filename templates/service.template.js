/**
 * A basic starter template for an angular service
 * @see https://github.com/johnpapa/angular-styleguide for additional details
 */

(function() {     
    // factory
    angular
        .module('<%= appName %>')
        .factory('<%= serviceName %>Service', <%= serviceName %>Service);

    <%= serviceName %>Service.$inject = ['$http', 'logger'];

    function <%= serviceName %>Service($http, logger) {

        return {
            getAvengers: getAvengers
        };

        function getAvengers() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(getAvengersFailed);

            function getAvengersComplete(response) {
                return response.data.results;
            }

            function getAvengersFailed(error) {
                logger.error('XHR Failed for getAvengers.' + error.data);
            }
        }
    }
})(); 
