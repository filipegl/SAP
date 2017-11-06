angular.module("sap").controller("sapCtrl", function($scope) {
	$scope.app = "Sistema de Áudio Personalisado";
	$scope.artistas=[];
	$scope.albuns=[];
	$scope.favoritos=[];
	$scope.notas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
	$scope.nomeButtonFavoritos = "+ Favoritos";
	//album = [{nome: "", musicas: [{nome: "", ano: 000, dur: ""]}, artista: ""}]
	

	$scope.showLista = function(){
		$scope.pesquisar = !$scope.pesquisar
	}


	$scope.showInfo = function(a){	
		$scope.info = !$scope.info

		var albunsDoArtista = getListaAlbuns(a);
		var musicasDoArtista = getMusicas(albunsDoArtista);
		$scope.infoArtista={nome: a.nome, nota:a.nota, ultimaMusica: a.ultimaMusica, img: a.img, albuns: albunsDoArtista, musicas: musicasDoArtista};
	}

	$scope.registraNotaEMusica = function (nota, musica, a){
		if (nota){
			getArtista().nota = nota;
		}
		if (musica){
			getArtista().ultimaMusica = getObjMusica(musica);
		}
		
		$scope.info = !$scope.info
	}

	var getArtista = function(){
		arrNomeArtistas = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		var index = arrNomeArtistas.indexOf($scope.infoArtista.nome);

		return $scope.artistas[index];
	}


// ia = index do album
// im = index da musica
	var getObjMusica = function(musica){
		for (var ia = 0; ia < $scope.albuns.length; ia++){
			if($scope.albuns[ia].nome == musica.album){

				for (var im = 0; im < $scope.albuns[ia].musicas.length; im++){
					if($scope.albuns[ia].musicas[im].nome == musica.nome){
						return $scope.albuns[ia].musicas[im];
					}
				}
			}	
		}

		var ia = $scope.albuns.indexOf(musica.album);
		$scope.albuns[ia].musica.indexOf(musica)
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

	 $scope.mudaNomeButtonFavoritos = function(a){
		if (a.favorito == undefined || !a.favorito){
			return "+ Favoritos";
		} else {
			return "- Favoritos";
		}
	}

	$scope.mudaFavoritos = function (a){
		if (a.favorito == undefined || !a.favorito){
			adicionarFavoritos(a);
		}else{
			var excluir = confirm("Deseja realmente excluir "+a.nome+" da lista de favoritos?");
			if (excluir){
				removeFavoritos(a);

			}
		}
	}

	var adicionarFavoritos = function(a){
		var index = $scope.artistas.indexOf(a);
		$scope.artistas[index].favorito = true;
	}

	var removeFavoritos = function(a){
		var index = $scope.artistas.indexOf(a);
		$scope.artistas[index].favorito = false;
	}

	$scope.adicionarArtista = function(artista) {
		console.log($scope.artistas)		
		// if (angular.lowercase($scope.artistas.nome).indexOf(angular.lowercase(artista.nome)) == -1){
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

	var getListaAlbuns = function(a){
		var albunsDoArtista=[];
		for (var i = 0; i < $scope.albuns.length; i++){
			if ($scope.albuns[i].artista == a.nome){
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