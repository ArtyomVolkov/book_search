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