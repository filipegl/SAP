app.controller("sapCtrl", function($scope, $http, playlistAPI, albumAPI) {
	//se der certo retirar artistas e albuns
	$scope.artistas=[];
	$scope.albuns = albumAPI.getAlbuns();
	//retirar a cima.
	$scope.favoritos=[];
	$scope.notas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
	$scope.tituloFavoritos = "Mostrar Favoritos";

	//INFOARTISTA
	$scope.showInfoArtista = function(artista){	
		if ($scope.infoArtista === undefined || $scope.infoArtista.nome == artista.nome || $scope.boolInfoArtista == false){
			$scope.boolInfoArtista = !$scope.boolInfoArtista;
		}

		var albunsDoArtista = albumAPI.getAlbunsDoArtista(artista);
		var musicasDoArtista = getMusicasDoArtista(albunsDoArtista);

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
		atualizaArtista(getArtista());	
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
			upaArtista(angular.copy(artista));
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
		atualizaArtista(artista);
	}

	var adicionarFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = true;
	}

	var removeFavoritos = function(artista){
		var index = $scope.artistas.indexOf(artista);
		$scope.artistas[index].favorito = false;
	}

	var getMusica = function(musica){
		for (var indexAlbum = 0; indexAlbum < $scope.albuns.length; indexAlbum++){
			if($scope.albuns[indexAlbum].nome == musica.album){

				for (var indexMusica = 0; indexMusica < $scope.albuns[indexAlbum].musicas.length; indexMusica++){
					if($scope.albuns[indexAlbum].musicas[indexMusica].nome == musica.nome){
						return $scope.albuns[indexAlbum].musicas[indexMusica];
					}
				}
			}
		}
	}


	var getMusicasDoArtista = function (albunsDoArtista){
		var musicasDoArtista=[];
		for (var indexAlbum = 0; indexAlbum < albunsDoArtista.length; indexAlbum++){
			for (var indexMusica = 0; indexMusica < albunsDoArtista[indexAlbum].musicas.length; indexMusica++){

				musicasDoArtista.push({nome: albunsDoArtista[indexAlbum].musicas[indexMusica].nome, album: albunsDoArtista[indexAlbum].nome})
			}
		}
		return musicasDoArtista;
	}
	

	$scope.adicionarMusica = function(novaMusica, artistaDaMusica, album){
		var adicionar = confirm("Você realmente quer adicionar esta música?");
		if (adicionar) {

			adicionarAlbum(artistaDaMusica, album);
			
			window.setTimeout(function (){
				var indexAlbum = albumAPI.indexDoAlbum(artistaDaMusica, album);
				var musicasDoAlbum = $scope.albuns[indexAlbum].musicas;
				if(playlistAPI.existeMusica(musicasDoAlbum, novaMusica)){
					alert("Música já existente no álbum");

				} else {
					
					$scope.albuns[indexAlbum].musicas.push(novaMusica);
					if ($scope.albuns[indexAlbum].id != undefined){
						atualizaAlbum($scope.albuns[indexAlbum]);
					}
					albumAPI.setAlbuns($scope.albuns);

					delete $scope.artistaDaMusica;
					delete $scope.album;
				}

				delete $scope.novaMusica;

			}, 200);
		}
	}

//ALBUNS
	var adicionarAlbum = function (artistaDaMusica, nomeAlbum){
		var album = {nome: nomeAlbum, musicas: [], artista: artistaDaMusica};
		$scope.albuns.push(album);
		albumAPI.setAlbuns($scope.albuns);
		upaAlbum(album);
		
		return album;
	}

//HTTP
	var carregaArtistas = function (){
		$http.get("http://localhost:8080/artistas").then(function (response){
			$scope.artistas = response.data;
		}).catch(function (status){
			console.log(status);
		});
	}

	var carregaAlbuns = function (){
		$http.get("http://localhost:8080/albuns").then(function (response){
			$scope.albuns = response.data;
			albumAPI.setAlbuns($scope.albuns);
		}).catch(function (status){
			console.log(status);
		});
	}

	var upaAlbum = function (album){
		$http.post("http://localhost:8080/albuns", album).then(function(response){
			carregaAlbuns()
		}).catch(function (status){
			console.log(status);
		});
	}
	var upaArtista = function (artista){
		$http.post("http://localhost:8080/artistas", artista).then(function(response){
			$scope.artistas.push(response.data);
		}).catch(function (status){
			console.log(status);
		});
	}
	var atualizaArtista = function (artista){
		$http.put("http://localhost:8080/artistas", artista).catch(function (status){
			console.log(status);
		});
	}
	var atualizaAlbum = function (album){
		$http.put("http://localhost:8080/albuns", album).catch(function (status){
			console.log(status);
		});
	}

	carregaArtistas();
	carregaAlbuns();
});