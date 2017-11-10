var router = require('./router');

var app = router(3000);

var artistas = [];
// var artistas = [
// 	{	nome: "Filipe", img: "../editar.jpg"}
// 	];
var albuns = [];
var playlists=[];

app.get('/artistas', function(req, res){
	 res.write(JSON.stringify(artistas));
	 res.end()
})

app.get('/albuns', function(req, res){
	 res.write(JSON.stringify(albuns));
	 res.end()
});

app.get('/playlists', function(req, res){
	 res.write(JSON.stringify(playlists));
	 res.end()
});

app.post('/artistas', function (req, res){
	var artista = req.body;
	artistas = JSON.parse(artista);
	res.end();
});

app.options('/artistas', function( req, res) {
	res.end();
})

app.post('/albuns', function (req, res){
	var album = req.body;
	albuns = JSON.parse(album);
	res.end();
});	

app.options('/albuns', function( req, res) {
	res.end();
})

app.post('/playlists', function (req, res){
	var playlist = req.body;
	playlists = JSON.parse(playlist);
	res.end();
});

app.options('/playlists', function( req, res) {
	res.end();
})