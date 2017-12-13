app.service("infoArtistaAPI", function(albumAPI){
	var that = this;
	this.notas = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
//	console.log("Album dentro do infoArtistaAPI: ");
//	console.log(albumAPI.getAlbuns());
	this.albuns = albumAPI.getAlbuns();
	this.artistas = [];
	
	this.setArtistas = function (artistas){
		this.artistas = artistas;
	}
	
	this.getArtistas = function(){
		return that.artistas;
	}
	
	this.getAlbunsDoArtista = function(artista) {
		return albumAPI.getAlbunsDoArtista(artista);
	}
	
	this.getMusicasDoArtista = function (albunsDoArtista){
		var musicasDoArtista=[];
		for (var indexAlbum = 0; indexAlbum < albunsDoArtista.length; indexAlbum++){
			for (var indexMusica = 0; indexMusica < albunsDoArtista[indexAlbum].musicas.length; indexMusica++){

				musicasDoArtista.push({nome: albunsDoArtista[indexAlbum].musicas[indexMusica].nome, album: albunsDoArtista[indexAlbum].nome})
			}
		}
		return musicasDoArtista;
	}
	
	this.getArtista = function(nomeDoArtista){
		arrNomeArtistas = that.artistas.map(function(e) { return angular.lowercase(e.nome); });
		var index = arrNomeArtistas.indexOf(angular.lowercase(nomeDoArtista));

		return that.artistas[index];
	}
	
	this.getMusica = function(musica){
		var albuns = albumAPI.getAlbuns();
		for (var indexAlbum = 0; indexAlbum < albuns.length; indexAlbum++){
			if(albuns[indexAlbum].nome == musica.album){

				for (var indexMusica = 0; indexMusica < albuns[indexAlbum].musicas.length; indexMusica++){
					if(albuns[indexAlbum].musicas[indexMusica].nome == musica.nome){
						return albuns[indexAlbum].musicas[indexMusica];
					}
				}
			}
		}
		console.log("Música não encontrada");
	}
	
	this.getMusicaPorNome = function(musica){
		for (var indexAlbum = 0; indexAlbum < that.albuns.length; indexAlbum++){
			for (var indexMusica = 0; indexMusica < that.albuns[indexAlbum].musicas.length; indexMusica++){
				if(angular.lowercase(that.albuns[indexAlbum].musicas[indexMusica].nome) == angular.lowercase(musica.nome)){

					return that.albuns[indexAlbum].musicas[indexMusica];
				}
			}
		}
		return undefined;
	}
	
	this.existeMusica = function (musicas, musica) {
		var arrNomeMusicas = musicas.map(function(e) { return angular.lowercase(e.nome); });
		return (arrNomeMusicas.indexOf(angular.lowercase(musica.nome)) != -1)
	}
});