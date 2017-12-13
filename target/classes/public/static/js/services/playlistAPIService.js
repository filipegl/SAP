app.service("playlistAPI", function(albumAPI){
	var that = this;

	this.playlists = [];
	this.setPlaylists = function (playlists){
		this.playlists = playlists;
	}

	this.getPlaylists = function(){
		return that.playlists;
	}

	this.getMusicaPorNome = function(musica){
		var albuns = albumAPI.getAlbuns();
		for (var indexAlbum = 0; indexAlbum < albuns.length; indexAlbum++){
			for (var indexMusica = 0; indexMusica < albuns[indexAlbum].musicas.length; indexMusica++){
				if(angular.lowercase(albuns[indexAlbum].musicas[indexMusica].nome) == angular.lowercase(musica.nome)){

					return albuns[indexAlbum].musicas[indexMusica];
				}
			}
		}
		return undefined;
	}
	
	this.existeMusica = function (musicas, musica) {
		var arrNomeMusicas = musicas.map(function(e) { return angular.lowercase(e.nome); });
		return (arrNomeMusicas.indexOf(angular.lowercase(musica.nome)) != -1)
	}

	this.indexDaPlaylist = function(playlist){
		var arrNomePlaylists = that.playlists.map(function(e) { return angular.lowercase(e.nome); });
		return arrNomePlaylists.indexOf(angular.lowercase(playlist.nome));
	}
});