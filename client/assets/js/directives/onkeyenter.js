(function() {
    angular.module('videoApp')
        .directive('onKeyEnter', [function() {
            return function(scope, element, attrs) {
                element.bind("keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.onKeyEnter, { event: event });
                        });
                        //event.preventDefault();
                    }
                });
            };
        }]);
})();

