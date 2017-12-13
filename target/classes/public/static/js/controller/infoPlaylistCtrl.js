app.controller("infoPlaylistCtrl", function($scope, $http, item, playlistAPI) {
	$scope.infoPlaylist = item;

	$scope.adicionarMusicaPlaylist = function (musicaDaPlaylist){	
		var playlists = playlistAPI.getPlaylists();
		var mus = playlistAPI.getMusicaPorNome(musicaDaPlaylist);

		if(mus === undefined){
			alert("Musica não registrada no sistema");

		} else if (playlistAPI.existeMusica($scope.infoPlaylist.musicas, musicaDaPlaylist)){
			alert("Musica já registrada na playlist");

		} else {
			var index = playlistAPI.indexDaPlaylist($scope.infoPlaylist);

			playlists[index].musicas.push(mus);
			$scope.infoPlaylist.musicas = playlists[index].musicas
			playlistAPI.setPlaylists(playlists);
			
			atualizaPlaylist(playlists[index]);
		}

		delete $scope.musicaDaPlaylist;
	}

	$scope.excluirMusicaPlaylist = function(musica){
		var playlists = playlistAPI.getPlaylists();
		var excluir = confirm("Deseja realmente excluir " + musica.nome + " da playlist?");
		if (excluir){
			var index = playlistAPI.indexDaPlaylist($scope.infoPlaylist);
			var arrNomeMusicasPlaylist = playlists[index].musicas.map(function(e) { return angular.lowercase(e.nome); });

			var indexMusica = arrNomeMusicasPlaylist.indexOf(angular.lowercase(musica.nome));
			
			playlists[index].musicas.splice(indexMusica, 1);
			playlistAPI.setPlaylists(playlists);

			atualizaPlaylist(playlists[index]);	
		}
		
	}
	var atualizaPlaylist = function (playlist){
		$http.put("http://localhost:8080/playlist", playlist).catch(function (status){
			console.log(status);
		});
	}
}); 