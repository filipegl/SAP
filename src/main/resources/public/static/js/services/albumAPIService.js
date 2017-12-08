app.service("albumAPI", function(){
	var that = this;

	this.albuns = [];
	this.setAlbuns = function (albuns){
		this.albuns = albuns;
	}
	
	this.getAlbuns = function(){
		return that.albuns;
	}
	
	this.indexDoAlbum = function (artista, album) {
		var index = -1
		for (var i = 0; i < that.albuns.length; i++){
			if (angular.lowercase(that.albuns[i].nome) == angular.lowercase(album) && angular.lowercase(that.albuns[i].artista) == angular.lowercase(artista)){
				index = i;
			}
		}
		
		return index;

	}
	
	this.getAlbunsDoArtista = function(artista){
		var albunsDoArtista=[];
		for (var i = 0; i < that.albuns.length; i++){
			if (angular.lowercase(that.albuns[i].artista) == angular.lowercase(artista.nome)){
				albunsDoArtista.push(that.albuns[i]);
			}
		}
		return albunsDoArtista;
	}
	
});