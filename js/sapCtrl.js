app.controller("sapCtrl", function($scope, $localStorage) {
	$scope.app = "Sistema de Áudio Personalisado";
	$scope.artistas=[];
	$scope.albuns=[];
	$scope.favoritos=[];
	$scope.notas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
	$scope.playlists=[];
	
	//album = [{nome: "", musicas: [{nome: "", ano: 000, dur: ""]}, artista: ""}]
	
	$scope.adicionarPlaylist = function (playlist){

		if (indexDaPlaylist(playlist) != -1){
			alert("Playlist já existe no sistema");
		} else {
			playlist.musicas = [];
			$scope.playlists.push(angular.copy(playlist));
		}

		delete $scope.playlist;

	}

	$scope.showArtistas = function(){
		$scope.pesquisar = !$scope.pesquisar
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
		}
		
	}
	$scope.excluirMusicaPlaylist = function(musica){
		var index = indexDaPlaylist($scope.infoPlaylist);
		var arrNomeMusicasPlaylist = $scope.playlists[index].musicas.map(function(e) { return angular.lowercase(e.nome); });
		var iom = arrNomeMusicasPlaylist.indexOf(musica.nome);
		
		$scope.playlists[index].musicas.splice(iom, 1);
	}


	//INTERLIGAR INDEX.HTML COM PLAYLIST.HTML
	$scope.adicionarMusicaPlaylist = function (musicaDaPlaylist){
		// var mus = getMusicaPorNome(musicaDaPlaylist);
		//  if (mus === undefined){
		//  	alert("Musica não registrada no sistema");
		// } else {
		// 		$scope.infoPLaylist.musicas.push(mus);
		// }
		var index = indexDaPlaylist($scope.infoPlaylist);

		$scope.playlists[index].musicas.push(angular.copy(musicaDaPlaylist));
		$scope.infoPlaylist.musicas = $scope.playlists[index].musicas
		delete $scope.musicaDaPlaylist;



	}


	var indexDaPlaylist = function(playlist){
		var arrNomePlaylists = $scope.playlists.map(function(e) { return angular.lowercase(e.nome); });
		return arrNomePlaylists.indexOf(angular.lowercase(playlist.nome));
	}

	$scope.showInfoArtista = function(artista){	
		if ($scope.infoArtista === undefined || $scope.infoArtista.nome ==  artista.nome || $scope.boolInfoArtista == false){
			$scope.boolInfoArtista = !$scope.boolInfoArtista;
		}

		var albunsDoArtista = getListaAlbuns(artista);
		var musicasDoArtista = getMusicas(albunsDoArtista);

		$scope.infoArtista={nome: artista.nome, nota:artista.nota, ultimaMusica: artista.ultimaMusica, img: artista.img, albuns: albunsDoArtista, musicas: musicasDoArtista};
	}

	$scope.registraNotaEMusica = function (nota, musica){
		if (nota){
			getArtista().nota = nota;
			$scope.infoArtista.nota = nota;
			delete $scope.nota;
		}

		if (musica){
			getArtista().ultimaMusica = getMusica(musica);
			$scope.infoArtista.ultimaMusica= getArtista().ultimaMusica;
			delete $scope.musica;
		}
	}

	var getArtista = function(){
		arrNomeArtistas = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		var index = arrNomeArtistas.indexOf($scope.infoArtista.nome);

		return $scope.artistas[index];
	}


// ia = index do album
// im = index da musica
	var getMusicaPorNome = function(musica){
		for (var ia = 0; ia < $scope.albuns.length; ia++){
			for (var im = 0; im < $scope.albuns[ia].musicas.length; im++){
				if($scope.albuns[ia].musicas[im].nome == musica.nome){
					return $scope.albuns[ia].musicas[im];
				}
			}
		}

		return undefined;
	}
	var getMusica = function(musica){
		for (var ia = 0; ia < $scope.albuns.length; ia++){
			if($scope.albuns[ia].nome == musica.album){

				for (var im = 0; im < $scope.albuns[ia].musicas.length; im++){
					if($scope.albuns[ia].musicas[im].nome == musica.nome){
						return $scope.albuns[ia].musicas[im];
					}
				}
			}
		}
	}


	var getMusicas = function (albunsDoArtista){
		var musicasDoArtista=[];
		for (var ia = 0; ia < albunsDoArtista.length; ia++){
			for (var im = 0; im < albunsDoArtista[ia].musicas.length; im++){

				musicasDoArtista.push({nome: albunsDoArtista[ia].musicas[im].nome, album: albunsDoArtista[ia].nome})
			}
		}

		return musicasDoArtista;
	}

	$scope.filtraFavoritos = function(){
		if ($scope.ehFavorito === undefined){
			$scope.ehFavorito = true;
		} else {
			$scope.ehFavorito = undefined;
		}
	}

	 $scope.mudaNomeButtonFavoritos = function(artista){
		if (artista.favorito === undefined || !artista.favorito){
			return "+ Favoritos";
		} else {
			return "- Favoritos";
		}
	}

	$scope.mudaFavoritos = function (artista){
		if (artista.favorito === undefined || !artista.favorito){
			adicionarFavoritos(artista);
		}else{
			var excluir = confirm("Deseja realmente excluir "+artista.nome+" da lista de favoritos?");
			if (excluir){
				removeFavoritos(artista);

			}
		}
	}

	var adicionarFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = true;
	}

	var removeFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = false;
	}

	$scope.adicionarArtista = function(artista) {
		if (existeArtista(artista)) {
			alert("Artista já existente no sistema");

		} else {
			$scope.artistas.push(angular.copy(artista));	
		}

		delete $scope.artista;
	}

	$scope.adicionarMusica = function(musica, artistaDaMusica, album){
		var adicionar = confirm("Você realmente quer adicionar esta música?");
		if (adicionar) {
			var indexAlbum = indexDoAlbum(album);

			if (indexAlbum == -1){
				adicionarAlbum(artistaDaMusica, album);
				indexAlbum = indexDoAlbum(album);
			}

			var musicasDoAlbum = $scope.albuns[indexAlbum].musicas;

			if(existeMusicaNoAlbum(musicasDoAlbum, musica)){
				alert("Música já existente no álbum");

			} else {
				$scope.albuns[indexAlbum].musicas.push(musica);
				delete $scope.artistaDaMusica;
				delete $scope.album;
			}

			delete $scope.musica;
		}
	}

	var adicionarAlbum = function (artistaDaMusica, album){
		$scope.albuns.push({nome: album, musicas: [], artista: artistaDaMusica});
	}

	var getListaAlbuns = function(artista){
		var albunsDoArtista=[];
		for (var i = 0; i < $scope.albuns.length; i++){
			if ($scope.albuns[i].artista == artista.nome){
				albunsDoArtista.push($scope.albuns[i]);
			}
		}
		return albunsDoArtista;
	}

	var existeArtista = function (artista) {
		arrArtistaNome = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		if (arrArtistaNome.indexOf(angular.lowercase(artista.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}

	var existeMusicaNoAlbum = function (musicasDoAlbum, musica) {
		arrNomeMusicasDoAlbum = musicasDoAlbum.map(function(e) { return angular.lowercase(e.nome); });
		if (arrNomeMusicasDoAlbum.indexOf(angular.lowercase(musica.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}

	var indexDoAlbum = function (album) {
		var arrNomeAlbuns = $scope.albuns.map(function(e) { return angular.lowercase(e.nome); });
		return arrNomeAlbuns.indexOf(angular.lowercase(album));
	}


});