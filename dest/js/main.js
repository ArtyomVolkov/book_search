angular.module("bookSearch", []);
angular.module("bookSearch").controller("bookListCtrl", 
	['$scope', 'dataFactory', '$timeout', 
	function ($scope, dataFactory, $timeout) {
	
	var WAITING = 500,
		timing;

	$scope.autoSearch = true;

	function _setTimer () {
		if (timing) {
			$timeout.cancel(timing);
		}

		if (!$scope.autoSearch) {
			return;
		}
		timing = $timeout(_searchItems, WAITING);
	}

	function _searchItems () {
		if ($scope.searchStr.length <= 3) {
			return;
		}

		dataFactory.getData($scope.searchStr, function () {
			$scope.items = dataFactory.getItems();
		});
	}

	$scope.search = function () {
		if (!$scope.autoSearch) {
			_searchItems();
		}
	};

	$scope.onChangeStr = function () {
		_setTimer();
	};
}]);
angular.module("bookSearch").directive("bookItem", 
	["$rootScope", 
	function ($rootScope) {
		return {
			restrict: 'A',
			templateUrl: 'templates/bookItem.html',
			link: function (scope, element, attrs) {

			}
		};
	}
]);
angular.module("bookSearch").directive("dropdown", 
	["$rootScope", 
	function ($rootScope) {
		return {
			restrict: 'A',
			templateUrl: 'templates/dropdown.html',
			link: function (scope, element, attrs) {
				var el = $(element).find(".dropdown");

				el.on("click", "a", function (e) {
					e.preventDefault();
				});
			}
		};
	}
]);
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
angular.module("bookSearch").factory("dataFactory", 
	['$http',
	function ($http) {
	var srv = {},
		isInfiniteScroll = false,
		items = null;

	srv.getData = function (str, callback) {
		$http.get("https://www.googleapis.com/books/v1/volumes?q=" + str).success(function (data) {
			items = data.items;
			callback();
		});
	};
	
	srv.getItems = function () {
		return items;
	};

	return srv;
}]);