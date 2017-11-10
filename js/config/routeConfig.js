app.config(function ($routeProvider){
	$routeProvider.when("/", {
		templateUrl: 'view/inicial.html',
		controller: "sapCtrl"
	});
	$routeProvider.when("/playlists", {
		templateUrl: 'view/playlist.html',
		controller: "playlistCtrl"
	});

});