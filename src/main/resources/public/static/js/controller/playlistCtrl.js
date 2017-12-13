app.controller("playlistCtrl", function($scope, $http, $uibModal, playlistAPI) {
	$scope.playlists=[];

	$scope.adicionarPlaylist = function (playlist){
		if (playlistAPI.indexDaPlaylist(playlist) != -1){
			alert("Playlist já existe no sistema");
		} else {
			playlist.musicas = [];
			upaPlaylist(angular.copy(playlist));
		}

		delete $scope.playlist;
	}

	

	$scope.showInfoPlaylist = function(playlist){
		var modalInstance = $uibModal.open({
	        templateUrl: 'templates/infoPlaylist.html',
	        controller: 'infoPlaylistCtrl',
	        size: 'sm',
	        resolve: {
	          item: function () {
	            return playlist;
	          }
	        }
	      });
	}

	$scope.excluirPlaylist = function(playlist){
		var excluir = confirm("Deseja realmente excluir "+playlist.nome+"?");
		if (excluir){
			var index = playlistAPI.indexDaPlaylist(playlist);
			$scope.playlists.splice(index, 1);
			
			deletaPlaylist(playlist.id);
		}
	}


	//HTTP
	var upaPlaylist = function (playlist){
		$http.post("http://localhost:8080/playlist", playlist).then(function (response){
			$scope.playlists.push(response.data);
			playlistAPI.setPlaylists($scope.playlists);
			
		}).catch(function(status){
			console.log(status);
		});
	}
	
	
	var deletaPlaylist = function (id){
		$http.delete("http://localhost:8080/playlist/" + id).then(function (response, status){
			$scope.playlists = response.data;
		}).catch(function (status){
			console.log(status);
		});
	}
	var carregaPlaylists = function (){
		$http.get("http://localhost:8080/playlist").then(function (response, status){
			$scope.playlists = response.data;
		}).catch(function (status){
			console.log(status);
		});
	}
	carregaPlaylists();

}); 