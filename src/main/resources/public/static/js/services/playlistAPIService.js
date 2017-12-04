app.service("playlistAPI", function(){
	var that = this;

	this.albuns = [];
	this.setAlbuns = function (albuns){
		this.albuns = albuns;
	}
	
	this.getMusicaPorNome = function(musica){
		for (var ia = 0; ia < that.albuns.length; ia++){
			for (var im = 0; im < that.albuns[ia].musicas.length; im++){
				if(angular.lowercase(that.albuns[ia].musicas[im].nome) == angular.lowercase(musica.nome)){

					return that.albuns[ia].musicas[im];
				}
			}
		}
		return undefined;
	}

	this.existeMusica = function (musicasDaPlaylist, musica) {
		arrNomeMusicasDaPlaylist = musicasDaPlaylist.map(function(e) { return angular.lowercase(e.nome); });
		if (arrNomeMusicasDaPlaylist.indexOf(angular.lowercase(musica.nome)) != -1){
			return true;
		} else {
			return false;
		}
	}
});