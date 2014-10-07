//création d'un service
/* premier attribut = le nom du service, 
deuxième attribut = une liste avec les dépendances en premier, et le dernier
attribut est la fonction quand le service doit être créé 
*/

schoolServices.factory('schoolAPIService', ["$http", function ($http){
	return {
		register: function (user){
			user.sections = [user.section, user.classe];
			return $http.put('/auth/register', {
				user: user
			});
		}, 
		login: function (username, password){
			return $http.post('/auth/login', {
				username: username,
				password: password
			});
		},
		getSection: function (){
			return $http.get('/api/section/list');
		},
		getClasse: function (id) {
			return $http.get('/api/section/list/'+id);
		},
		addThread:function (thread, id){
			var message = {
				text: thread.text
			};
			return $http.put('/api/thread/add/section/'+id, {
				thread: thread,
				message: message
			});
		},
		getThreadBySection: function (sectionId){
			return $http.get('/api/thread/list/section/'+sectionId);
		},
		getFirstMessage: function (threadId){
			return $http.get('/api/message/first/thread/'+threadId);
		},
		getThread: function (threadId){
			return $http.get('/api/thread/'+threadId);
		},
		sendMessage: function (message, threadId) {
			return $http.put('/api/message/add/thread/'+threadId, {message: message});
		},
		addPoint: function (userId){
			return $http.post('api/user/add/point/'+userId);
		},
		closeThread: function (threadId){
			return $http.post('api/thread/update/status/'+threadId);
		},
		getUser: function (userId) {
			return $http.get('/api/user/'+userId);
		}
	};
}]);