schoolControllers.controller('ThreadController', ["$scope", "$routeParams", "$rootScope", "schoolAPIService", "User", "$location", function ($scope, $routeParams, $rootScope, api, User, $location){
	User.checkLogged(null, "/");
	$scope.thread = {};
	$scope.threadSubmit = function () {
		if($scope.threadForm.$valid){
			api.addThread($scope.thread, $routeParams.sectionId).success(function (data){
				if(data.success){
					$rootScope.$broadcast('error', {message: "Thread ajouté", type: "success"});
					$location.path('/accueil/'+$routeParams.sectionId);
				}
			});
		}
	}
}]);