package com.example.SAP.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.SAP.model.Artista;
import com.example.SAP.service.ArtistaService;

@RestController
public class ArtistaController {

	@Autowired
	ArtistaService artistaService;

	@RequestMapping(method = RequestMethod.POST, value = "/artistas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Artista> adicionarArtista(@RequestBody Artista artista) {
		Artista artistaAdicionado = artistaService.adicionar(artista);
		return new ResponseEntity<Artista>(artistaAdicionado, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/artistas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Artista> atualizarArtista(@RequestBody Artista artista) {
		Artista artistaAtualizado = artistaService.adicionar(artista);
		return new ResponseEntity<Artista>(artistaAtualizado, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/artistas", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Artista>> buscarTodosArtistas() {

		Collection<Artista> artistasBuscados = artistaService.buscarTodos();
		return new ResponseEntity<>(artistasBuscados, HttpStatus.OK);
	}


	
}
