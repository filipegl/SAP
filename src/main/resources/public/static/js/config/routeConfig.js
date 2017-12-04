app.config(function ($routeProvider){
	$routeProvider.when("/", {
		templateUrl: 'templates/inicial.html',
		controller: "sapCtrl"
	});
	$routeProvider.when("/playlists", {
		templateUrl: 'templates/playlist.html',
		controller: "playlistCtrl"
	});

});