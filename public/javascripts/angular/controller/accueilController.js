schoolControllers.controller('AccueilController', ["$scope", "schoolAPIService", "User", "$routeParams", function ($scope, api, User, $routeParams){
	User.checkLogged(null, "/");
	console.log($routeParams.sectionId);
	if(typeof $routeParams.sectionId !== "undefined"){
		api.getThreadBySection($routeParams.sectionId).success(function (data){
			if(data.success){
				$scope.threads = data.threads;
			}
		});
	}else{
		
	}
	$scope.getMessage = function (threadId){
		api.getFirstMessage(threadId).success(function (data){
			if(data.success){
				console.log(data);
				$scope.firstMessage = data.message;
			}
		});
	}
}]);

