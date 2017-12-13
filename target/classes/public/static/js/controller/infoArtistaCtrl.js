app.controller("infoArtistaCtrl", function($http, $scope, infoArtistaAPI, item){

	$scope.notas = infoArtistaAPI.notas;
	var artista = item;
	var albunsDoArtista = infoArtistaAPI.getAlbunsDoArtista(artista);
	var musicasDoArtista = infoArtistaAPI.getMusicasDoArtista(albunsDoArtista);
	

	$scope.infoArtista={
		nome: artista.nome, 
		nota:artista.nota, 
		ultimaMusica: artista.ultimaMusica, 
		img: artista.img, 
		albuns: albunsDoArtista, 
		musicas: musicasDoArtista
	};

	$scope.registraNotaEMusica = function (nota, musica){
		var artista = infoArtistaAPI.getArtista($scope.infoArtista.nome); 
		if (nota){
			artista.nota = nota;
			$scope.infoArtista.nota = nota;
			delete $scope.nota;
		}

		if (musica){
			artista.ultimaMusica = infoArtistaAPI.getMusica(musica);
			$scope.infoArtista.ultimaMusica = artista.ultimaMusica;
			delete $scope.musica;
		}
		atualizaArtista(infoArtistaAPI.getArtista($scope.infoArtista.nome));	
	}

	var atualizaArtista = function (artista){
		$http.put("http://localhost:8080/artistas", artista).catch(function (status){
			console.log(status);
		});
	}
	
});