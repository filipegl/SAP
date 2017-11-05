angular.module("sap").controller("sapCtrl", function($scope) {
	$scope.app = "Sistema de Áudio Personalisado";
	$scope.artistas=[];
	$scope.albuns=[];
	$scope.favoritos=[];
	$scope.notas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	albunsDoArtista=[];
	var musicasDoArtista=[];
	$scope.nomeButtonFavoritos = "+ Favoritos"
	//album = [{nome: "", musicas: [{nome: "", ano: 000, dur: ""]}, artista: ""}]
	
// RETORNAR O ARRAY AO EM getListaAlbuns e GetMusicas
	$scope.showLista = function(){
		$scope.pesquisar = !$scope.pesquisar
	}

	$scope.showInfo = function(a){	
		$scope.info = !$scope.info
		getListaAlbuns(a);
		getMusicas(albunsDoArtista)
		$scope.infoArtista={nome: a.nome, nota:a.nota, ultimaMusica: a.ultimaMusica, img: a.img, albuns: albunsDoArtista, musicas: musicasDoArtista};
	}

	$scope.registraNotaEMusica = function (nota, musica, a){
		if (nota){
			getArtista().nota = nota;
		}
		if (musica){
			var m = getObjMusica(musica);
			getArtista().ultimaMusica = m;
		}
		
		$scope.info = !$scope.info
	}

	var getArtista = function(){
		arrNomeArtistas = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		var index = arrNomeArtistas.indexOf($scope.infoArtista.nome);

		return $scope.artistas[index];
	}



	var getObjMusica = function(musica){

		for (var ioa = 0; ioa < $scope.albuns.length; ioa++){
			if($scope.albuns[ioa].nome == musica.album){
				for (var iom = 0; iom < $scope.albuns[ioa].musicas.length; iom++){

					if($scope.albuns[ioa].musicas[iom].nome == musica.nome){
						return $scope.albuns[ioa].musicas[iom];
					}
				}
			}	
		}
		var ioa = $scope.albuns.indexOf(musica.album);
		$scope.albuns[ioa].musica.indexOf(musica)
	}


	var getMusicas = function (albunsDoArtista){
		// ioa = index of album
		// iom = index of musica
		musicasDoArtista=[];
		for (var ioa = 0; ioa < albunsDoArtista.length; ioa++){
			for (var iom = 0; iom < albunsDoArtista[ioa].musicas.length; iom++){
				musicasDoArtista.push({nome: albunsDoArtista[ioa].musicas[iom].nome, album: albunsDoArtista[ioa].nome})
			}
		}


	}

	$scope.apenasFavoritos = function(){
		if ($scope.ehFavorito === undefined){
			$scope.ehFavorito = true;
		} else {
			$scope.ehFavorito = undefined;
		}
	
		console.log($scope.ehFavorito);
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
			var result = confirm("Deseja realmente excluir "+a.nome+" da lista de favoritos?");
			if (result){
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
		var add = confirm("Você realmente quer adicionar esta música?");
		if (add) {
			console.log("confirmou");
			var indexAlbum = indexOfAlbum(album);

			if (indexAlbum == -1){
				console.log("album nao existe");
				adicionarAlbum(artistaDaMusica, album);
				indexAlbum = indexOfAlbum(album);
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
		albunsDoArtista=[];
		for (var i = 0; i < $scope.albuns.length; i++){
			if ($scope.albuns[i].artista == a.nome){
				albunsDoArtista.push($scope.albuns[i]);
			}
		}
	}

	var existeArtista = function (artista) {
		pos = $scope.artistas.map(function(e) { return angular.lowercase(e.nome); });
		if (pos.indexOf(angular.lowercase(artista.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}

	var existeMusicaNoAlbum = function (musicasDoAlbum, musica) {
		pos = musicasDoAlbum.map(function(e) { return angular.lowercase(e.nome); });
		if (pos.indexOf(angular.lowercase(musica.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}

	var indexOfAlbum = function (album) {
		var pos = $scope.albuns.map(function(e) { return angular.lowercase(e.nome); });

		console.log("iOA: "+pos.indexOf(angular.lowercase(album)));

		return pos.indexOf(angular.lowercase(album));
	}


});