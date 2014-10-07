var schoolApp = angular.module('schoolApp', ["schoolControllers", "schoolServices", "ngRoute", "andranik.time-ago"]);
schoolApp.config(["$routeProvider", function ($routeProvider){
	// sur la page d'accueil, charger index.html
	$routeProvider
	.when('/', {
		templateUrl: "partials/index.html",
		controller: "IndexController"
	})
	.when('/accueil/:sectionId', {
		templateUrl: "partials/accueil.html",
		controller: "AccueilController"
	})
	.when('/accueil', {
		templateUrl: "partials/accueil.html",
		controller: "AccueilController"
	})
	.when('/thread/add/:sectionId', {
		templateUrl: "partials/create-thread.html",
		controller: "ThreadController"
	})
	.when('/thread/:threadId', {
		templateUrl: "partials/threadDetail.html",
		controller: "ThreadDetailController"
	})
	.otherwise({
		redirectTo: "/"
	});
}]);

schoolApp.factory('AuthInterceptor', function ($window, $q, $location) {
   "use strict";
   return {
       request : function (config) {
           console.log('SEND REQUEST: ' + config.url);
           config.headers = config.headers || {};
           if ($window.sessionStorage.token) {
               console.log('WITH TOKEN: ' + $window.sessionStorage.token);
               config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
           }
           return config || $q.when(config);
       },
       response : function (response) {
           console.log('RESPONSE STATUS: ' + response.status);
           if (response.status === 401) {
               response.data = {
                   status : false,
                   message : "Auth required"
               };
               $location.path('/');
           }
           return response || $q.when(response);
       }
   };
});
schoolApp.config(function ($httpProvider) {
   "use strict";
   $httpProvider.interceptors.push('AuthInterceptor');
});

// machine à écrire
schoolApp.directive('machine', function (){
	return {
		restrict: "E",
		link: function (scope, element, attributes){
			var text = element[0].innerHTML;
			element[0].innerHTML = "";
			var time = function (text, fulltext){
				setTimeout(function (){
					if(text.length !== fulltext.length){
						text+=fulltext[text.length];
						element[0].innerHTML = text;
						time(text, fulltext);
					}
				}, attributes.interval);
			}

			setTimeout(function(){
				time("", text);
			}, attributes.delay*1000);
		} 
	}
});