(function() {
    'use strict';

    angular
        .module('<%= appName %>')
        .directive('<%= directiveName %>', <%= directiveName %>);

    /* @ngInject */
    function <%= directiveName %>() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'templateUrl',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
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

        activate();

        function activate() {

        }
    }
})();
