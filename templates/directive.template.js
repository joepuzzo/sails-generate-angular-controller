(function() {
    'use strict';

    angular
        .module('<%= appName %>')
        .directive('<%= directiveName %>', <%= directiveName %>);

    /* @ngInject */
    function <%= directiveName %>() {
        var directive = {
            restrict: 'E',
            templateUrl: 'templateUrl',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'something',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['dependencies'];

    /* @ngInject */
    function Controller(dependencies) {
        var vm = this;

        vm.doSomthing = doSomething;

        function doSomething() { 

        }
    }
})();
