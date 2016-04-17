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