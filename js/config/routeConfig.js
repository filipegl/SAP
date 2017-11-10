app.config(function ($routeProvider){
	$routeProvider.when("/", {
		templateUrl: 'view/inicial.html',
		controller: "sapCtrl"
	});
	$routeProvider.when("/playlists", {
		templateUrl: 'view/playlist.html',
		controller: "sapCtrl"
	});

});



// app.config(['$stateProvider', function ($stateProvider){
// 	$stateProvider.state('inicial', {
// 		url: '/inicial' ,
// 		templateUrl: 'view/inicial.html',
// 		controller: "sapCtrl"
// 	});
// }]);