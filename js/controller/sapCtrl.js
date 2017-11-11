app.controller("sapCtrl", function($scope, $http, playlistAPI) {
	$scope.svc = playlistAPI;
	$scope.artistas=[];
	$scope.albuns=[];
	$scope.favoritos=[];
	$scope.notas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
	$scope.tituloFavoritos = "Mostrar Favoritos";
	
	//album = [{nome: "", musicas: [{nome: "", ano: 000, dur: ""]}, artista: ""}]

	//PLAYLISTS

	//INTERLIGAR INDEX.HTML COM PLAYLIST.HTML

	//INFOARTISTA
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
			console.log(getArtista());
			getArtista().nota = nota;
			$scope.infoArtista.nota = nota;
			delete $scope.nota;
		}

		if (musica){
			getArtista().ultimaMusica = getMusica(musica);
			$scope.infoArtista.ultimaMusica= getArtista().ultimaMusica;
			delete $scope.musica;
		}
		upaArtistas();	
	}

	//ARTISTAS e FAVORITOS
	$scope.showArtistas = function(){
		$scope.pesquisar = !$scope.pesquisar
	}

	var getArtista = function(){
		arrNomeArtistas = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		var index = arrNomeArtistas.indexOf(angular.lowercase($scope.infoArtista.nome));

		return $scope.artistas[index];
	}
	$scope.adicionarArtista = function(artista) {
		if (existeArtista(artista)) {
			alert("Artista já existente no sistema");

		} else {
			$scope.artistas.push(angular.copy(artista));
			upaArtistas();
		}

		delete $scope.artista;
	}

	var existeArtista = function (artista) {
		arrArtistaNome = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		if (arrArtistaNome.indexOf(angular.lowercase(artista.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}

	$scope.filtraFavoritos = function(){
		if ($scope.ehFavorito === undefined){
			$scope.ehFavorito = true;
			$scope.tituloFavoritos = "Mostrar Todos";
		} else {
			$scope.ehFavorito = undefined;
			$scope.tituloFavoritos = "Mostrar Favoritos";
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
		upaArtistas();
	}

	var adicionarFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = true;
	}

	var removeFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = false;
	}


//MUSICAS
// ia = index do album
// im = index da musica
	var getMusicaPorNome = function(musica){
		//incluir angular.lowercase();
		for (var ia = 0; ia < $scope.albuns.length; ia++){
			for (var im = 0; im < $scope.albuns[ia].musicas.length; im++){
				if(angular.lowercase($scope.albuns[ia].musicas[im].nome) == angular.lowercase(musica.nome)){

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

	

	$scope.adicionarMusica = function(novaMusica, artistaDaMusica, album){
		var adicionar = confirm("Você realmente quer adicionar esta música?");
		if (adicionar) {
			var indexAlbum = indexDoAlbum(album);

			if (indexAlbum == -1){
				adicionarAlbum(artistaDaMusica, album);
				indexAlbum = indexDoAlbum(album);
			}

			var musicasDoAlbum = $scope.albuns[indexAlbum].musicas;

			if(existeMusica(musicasDoAlbum, novaMusica)){
				alert("Música já existente no álbum");

			} else {
				$scope.albuns[indexAlbum].musicas.push(novaMusica);
				upaAlbuns;
				$scope.svc.setAlbuns($scope.albuns);
				delete $scope.artistaDaMusica;
				delete $scope.album;
			}

			delete $scope.novaMusica;
		}
	}

//ALBUNS
	var adicionarAlbum = function (artistaDaMusica, album){
			$scope.albuns.push({nome: album, musicas: [], artista: artistaDaMusica});
			upaAlbuns();
			$scope.svc.setAlbuns($scope.albuns);
	}

	var getListaAlbuns = function(artista){
		var albunsDoArtista=[];
		for (var i = 0; i < $scope.albuns.length; i++){
			if (angular.lowercase($scope.albuns[i].artista) == angular.lowercase(artista.nome)){
				albunsDoArtista.push($scope.albuns[i]);
			}
		}
		return albunsDoArtista;
	}


//============================
	var existeMusica = function (musicasDoAlbum, musica) {
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

//HTTP BACKAND
	var carregarArtistas = function (){
		$http.get("http://localhost:3000/artistas").then(function (data, status){
	
			$scope.artistas = data.data;
		}).catch(function (data, status){
			console.log(status);
		});
	}
	var carregarAlbuns = function (){
		$http.get("http://localhost:3000/albuns").then(function (data, status){

			$scope.albuns = data.data;
			$scope.svc.setAlbuns($scope.albuns);
		}).catch(function (data, status){
			console.log(status);
		});
	}


	var upaAlbuns = function (){
		$http.post("http://localhost:3000/albuns", $scope.albuns).catch(function (status){
			console.log(status);
		});
	}
	var upaArtistas = function (){
		$http.post("http://localhost:3000/artistas", $scope.artistas).catch(function (status){
			console.log(status);
		});
	}

	carregarArtistas();
	carregarAlbuns();
});