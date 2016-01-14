/**
 * A basic starter template for an angular controller
 * @see https://github.com/johnpapa/angular-styleguide for additional details
 */

(function() { 

    // This forces you to use strict syntax
    'use strict';

    // Attach the controller to the your app module
    angular.module('sails-generate-angular-controller')
           .controller('Amy', AmyController);

    // Recomended way of injecting dependencies
     AmyController.$inject = [/*'dependencies', '$go', 'here'*/];

    // The controller itsself 
    function  AmyController() {

        // Using capture variables is good habbit to get in to
        // it gives access to the 'this' object within callbacks 
        var vm = this;
        
        // Memeber variables and methods here
        vm.doSomething = doSomething;
        vm.add = add;
        vm.remove = remove;
        vm.adding = false;
        vm.stuff = [];
        vm.title = 'Welcome to your new amy page!';

        ////////////

        // Function definitions should go below here

        function doSomething() {
          /* code here! */
        }

        function add() {
          /* Simulate time passed for example!*/
          vm.adding = true;
          setTimeout(function(){ 
            vm.adding = false;
          }, 3000);
        }

        function remove() {
          /* */
        }
    }

})();
