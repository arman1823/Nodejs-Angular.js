schoolServices.factory('User', ["$window", "$location", "schoolAPIService", function ($window, $location, api){
	var token = null;
	var user = null;
	var refresh = null;
	var onLogin = function () {};
	var onUpdate = function () {};
	return {
		checkLogged: function(redIn, redOut){
			console.log(redIn);
			console.log(redOut);
			// si l'utilisateur n'a pas de token
			if(token === null){
				var t = $window.sessionStorage.token;
				var u = $window.sessionStorage.user;
				if(typeof t !== "undefined" && typeof u !== "undefined"){
					token = t;
					user = JSON.parse(u);
					if(redIn !== null){
						$location.path(redIn);
					}
				}
				// il est redirigé vers la page de connexion
				if(redOut !== null){
					$location.path(redOut);
					return;
				}
			}else{
				if(redIn !== null){
					$location.path(redIn);
				}
			}
		},
		setOnLogin: function (l) {
			onLogin = l;
		},
		setOnUpdate: function (u) {
			onUpdate = u;
		},
		login: function (t, u){
			// stocke le token t dans le service User
			token = t;
			user = u;
			// elle stocke le token dans le storage du navigateur
			$window.sessionStorage.token = t;
			$window.sessionStorage.user = JSON.stringify(u);
			refresh = setInterval(function () {
				api.getUser(user._id).success(function (data) {
					if (data.success) {
						user = data.user;
						$window.sessionStorage.user = JSON.stringify(data.user);
						onUpdate(data.user);
					}
				});
			}, 30000);
			onLogin(user);
			$location.path("/accueil");
		},
		logout: function(){
			token = null;
			user = null;
			delete $window.sessionStorage.token;
			delete $window.sessionStorage.user;
			clearInterval(refresh);
			$location.path('/');
		},
		isLogged: function (){
			return token !== null || typeof $window.sessionStorage.token !== "undefined";
		},
		getUser: function (){
			var str = $window.sessionStorage.user;
			if (!(typeof str === "undefined")) {
				return JSON.parse($window.sessionStorage.user);
			}
			return null;
		},
		update: function (nUser) {
			user = nUser;
			$window.sessionStorage.user = JSON.stringify(nUser);
			onUpdate(nUser);
		}
	}

}]);