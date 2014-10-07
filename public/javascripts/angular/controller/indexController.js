schoolControllers.controller('IndexController', ["$scope", "$location", "schoolAPIService", "User", function ($scope, $location, api, User){
 User.checkLogged('/accueil', null);
 $scope.registerUser = {section: 'null', classe: "null"};
 $scope.loginUser = {};
 $scope.error = null;
 // fonction executée quand le formulaire de connexion est cliqué
 $scope.loginSubmit = function(){
 	if($scope.loginForm.$valid){
 		console.log($scope.loginUser);
	 	api.login($scope.loginUser.eemail, $scope.loginUser.ppassword).success(function (data){
	 		console.log(data);
	 		//si la connexion se passe bien
	 		if(data.success){
	 			// User.login fait connecter l'utilisateur dans angular
	 			User.login(data.token, data.user);
	 		}
	 		else{
	 			$scope.error = data.error.message;
	 		}
	 	});
	 }
 };

// fonction executée quand le formulaire de création de compte est cliqué
 $scope.registerSubmit = function(){
// si le formulaire est valide
 	if($scope.registerForm.$valid){
 		// elle crée un utilisateur : registerUser correspond l'objet qui contient les données du formulaire : vor index.html>ng-model
 		api.register($scope.registerUser).success(function (data){
 			console.log(data);
 			if(data.success){
 				User.login(data.token, data.user);
 			}
 		});

 	}else{
 		
 	}
 };
// fonction exécutée lorsque l'utilisateur change de section : 
$scope.onChange = function () {
	// Si une vrai Section est choisie
	if($scope.registerUser.section !== "null"){
		// elle va chercher les classes correspondant à cette section, elle récupère les données
		api.getClasse($scope.registerUser.section).success(function (data){
			if(data.success){
				// variable créée pour stocker les classes
				$scope.classes = data.sections;

			}
		});
	}
}
// fonction executée à l'arrivée sur la page pour charger les sections et angular les affiche > voir index.html>select>section
 api.getSection().success(function (data){
 	if(data.success){
 		$scope.sections = data.sections;
 	}
 });
}]);