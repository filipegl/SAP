app.controller("playlistCtrl", function($scope, $http, playlistAPI) {
	$scope.playlists=[];

	$scope.adicionarPlaylist = function (playlist){
		if (indexDaPlaylist(playlist) != -1){
			alert("Playlist já existe no sistema");
		} else {
			playlist.musicas = [];
			$scope.playlists.push(angular.copy(playlist));
			upaPlaylists();
		}

		delete $scope.playlist;

	}

	$scope.adicionarMusicaPlaylist = function (musicaDaPlaylist){
		var mus = playlistAPI.getMusicaPorNome(musicaDaPlaylist);
		if(mus === undefined){
			alert("Musica não registrada no sistema");

		} else if (playlistAPI.existeMusica($scope.infoPlaylist.musicas, musicaDaPlaylist)){
			alert("Musica já registrada na playlist");

		} else {
			var index = indexDaPlaylist($scope.infoPlaylist);

			$scope.playlists[index].musicas.push(mus);
			$scope.infoPlaylist.musicas = $scope.playlists[index].musicas
			upaPlaylists();
		}

		delete $scope.musicaDaPlaylist;

	}

	$scope.showInfoPlaylist = function(playlist){
		if ($scope.infoPlaylist === undefined || $scope.infoPlaylist.nome == playlist.nome || $scope.boolInfoPlaylist == false){
				$scope.boolInfoPlaylist = !$scope.boolInfoPlaylist	
		} 

			$scope.infoPlaylist = playlist;
	}

	$scope.excluirPlaylist = function(playlist){
		var excluir = confirm("Deseja realmente excluir "+playlist.nome+"?");
		if (excluir){
			var index = indexDaPlaylist(playlist);
			$scope.playlists.splice(index, 1);
			$scope.showInfoPlaylist(playlist);
			upaPlaylists();
		}
	}

	$scope.excluirMusicaPlaylist = function(musica){
		var excluir = confirm("Deseja realmente excluir "+musica.nome+" da playlist?");
		if (excluir){
			var index = indexDaPlaylist($scope.infoPlaylist);
			var arrNomeMusicasPlaylist = $scope.playlists[index].musicas.map(function(e) { return angular.lowercase(e.nome); });

			//caso de erro excluir angular.lowercase(musica.nome)
			var iom = arrNomeMusicasPlaylist.indexOf(angular.lowercase(musica.nome));
			
			$scope.playlists[index].musicas.splice(iom, 1);
			upaPlaylists();	
		}
		
	}

	var indexDaPlaylist = function(playlist){
		var arrNomePlaylists = $scope.playlists.map(function(e) { return angular.lowercase(e.nome); });
		return arrNomePlaylists.indexOf(angular.lowercase(playlist.nome));
	}


	//HTTP
	var upaPlaylists = function (){
		console.log("upa");
		console.log($scope.playlists);
		$http.post("http://localhost:8080/playlist", $scope.playlists).catch(function (status){
			console.log(status);
		});
	}
	var carregarPlaylists = function (){
		$http.get("http://localhost:8080/playlist").then(function (data, status){
			$scope.playlists = data.data;
		}).catch(function (data, status){
			console.log(status);
		});
	}
	carregarPlaylists();

}); 