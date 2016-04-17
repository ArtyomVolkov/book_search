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