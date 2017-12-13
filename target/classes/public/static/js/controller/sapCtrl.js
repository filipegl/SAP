app.controller("sapCtrl", function($scope, $uibModal, $http, playlistAPI, albumAPI, infoArtistaAPI) {
	//se der certo retirar artistas e albuns
	$scope.artistas=[];
	$scope.albuns = albumAPI.getAlbuns();
	//retirar a cima.
	$scope.favoritos=[];
	
	$scope.tituloFavoritos = "Mostrar Favoritos";

	$scope.showInfoArtista = function(artista){	
		var modalInstance = $uibModal.open({
        templateUrl: 'templates/infoArtista.html',
        controller: 'infoArtistaCtrl',
        resolve: {
          item: function () {
            return artista;
          }
        }
      });
	}
	$scope.showCadastroUsuario = function(){
		console.log("Entrou");
		var modalInstance = $uibModal.open({
		templateUrl: 'templates/cadastroUsuario.html',
        controller: 'cadastroUsuarioCtrl',
    	});
	}

	//ARTISTAS e FAVORITOS
	$scope.showArtistas = function(){
		$scope.pesquisar = !$scope.pesquisar
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
		return arrArtistaNome.indexOf(angular.lowercase(artista.nome)) != -1;
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
			infoArtistaAPI.setArtistas($scope.artistas);
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