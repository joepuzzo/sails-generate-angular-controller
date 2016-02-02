/**
 * A basic starter template for an angular controller
 * @see https://github.com/johnpapa/angular-styleguide for additional details
 */

(function() { 

    // This forces you to use strict syntax
    'use strict';

    // Attach the controller to the your app module
    angular.module('<%= appName %>')
           .controller('<%= controllerName %>Controller', <%= controllerName %>Controller);

    // Recomended way of injecting dependencies
     <%= controllerName %>Controller.$inject = [/*'dependencies', '$go', 'here'*/];

    /* @ngInject */ 
    function  <%= controllerName %>Controller() {

        // Using capture variables is good habbit to get in to
        // it gives access to the 'this' object within callbacks 
        var vm = this;
        
        // Memeber variables and methods
        vm.adding = false;
        vm.stuff = [];
        vm.title = 'Welcome to your new <%= filename %> page!';
        vm.add = add;
        vm.remove = remove;
        
        ////////////

        // Function definitions should go below here

        function add() {

        }

        function remove() {

        }
    }

})();
