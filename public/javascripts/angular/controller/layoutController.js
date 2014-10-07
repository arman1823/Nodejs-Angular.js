schoolControllers.controller('LayoutController', ["$scope", "schoolAPIService", "User", "$location", function ($scope, api, User, $location){
	$scope.selectedSection = null;
	$scope.logged = User.isLogged();
	$scope.user = User.getUser();
	$scope.error = {
		new: false
	};
	api.getSection().success(function (data){
		if(data.success){
			$scope.sections = data.sections;
		}
	});
	$scope.onClickSection = function (index){
		api.getClasse($scope.sections[index]._id).success(function (data){
			if(data.success){
				$scope.classes = data.sections;
				$scope.selectedSection  = index;
				$location.path('/accueil/'+$scope.sections[index]._id);
			}
		});
	};
	$scope.logout = function (){
		$scope.logged = false;
		User.logout();
	};
	// quand il reçoit l'evenement login, il affiche le layout
	User.setOnLogin(function (user){
		$scope.logged = true;
		$scope.user = user;
	});
	User.setOnUpdate(function (user) {
		$scope.user = user;
	});
	$scope.$on('error', function (event, error) {
		console.log(error.message);
		$scope.error.new = true;
		$scope.error.message = error.message;
		$scope.error.type = error.type;
		setTimeout(function () {
			$scope.error.new = false;
		}, 4000);
	});

}]);