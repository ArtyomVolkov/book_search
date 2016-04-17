angular.module("bookSearch").directive("spinner", 
   ['$http', '$rootScope',
    function ($http, $rootScope) {
    	return {
    	   link: function (scope, element, attrs) {
    	        $rootScope.spinnerActive = false;

    	        scope.isLoading = function () {
    	            return $http.pendingRequests.length > 0;
    	    	};

                scope.$watch(scope.isLoading, function (loading) {
                    $rootScope.spinnerActive = loading;
                    if (loading) {
                    	element.addClass("loading");
                    } else {
                        element.removeClass('loading');
                    }
                });
            }
        };
    }
]);