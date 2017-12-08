app.service("playlistAPI", function(albumAPI){
	var that = this;

	this.albuns = albumAPI.getAlbuns();
	
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