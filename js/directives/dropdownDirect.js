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