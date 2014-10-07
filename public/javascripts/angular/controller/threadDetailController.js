// $routeParams = il stocke des données
schoolControllers.controller('ThreadDetailController', ["$scope", "$rootScope", "schoolAPIService", "User", "$routeParams",function ($scope, $rootScope, api, User, $routeParams){
	$scope.user = User.getUser();
	api.getThread($routeParams.threadId).success(function (data){
		if(data.success){
			$scope.thread = data.thread;
		}
		console.log(data);
	});
	$scope.sendMessage = function () {
		api.sendMessage({text: $scope.messageInput}, $scope.thread._id).success(function (data) {
			if (data.success) {
				$scope.messageInput = "";
				$scope.thread.messages.push(data.message);
				$rootScope.$broadcast('error', {message: "Message ajouté", type: "success"});
			} else {
				console.log(data);
				$rootScope.$broadcast('error', {message: data.error.message, type: "error"});
			}
		});
	};
	$scope.addPoint = function (message){
		api.addPoint(message.author._id).success(function (data){
			console.log(data);
		}).error(function (err){
			console.log(err);
		});
		api.closeThread($scope.thread._id).success(function (data){
			console.log(data);
			if (data.success) {
				$scope.thread.state = data.state;
			}
		});
	};
}]);