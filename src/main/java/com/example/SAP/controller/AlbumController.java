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

import com.example.SAP.model.Album;
import com.example.SAP.service.AlbumService;

@RestController
public class AlbumController {
	
	@Autowired
	AlbumService albumService;

	@RequestMapping(method = RequestMethod.POST, value = "/albuns", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Album> adicionarAlbum(@RequestBody Album album) {
		
		Album albumEncontrado = albumService.albumDoRepository(album);			
		if (albumEncontrado == null) {
			albumEncontrado = albumService.adicionar(album);
		}
	
		return new ResponseEntity<Album>(albumEncontrado, HttpStatus.CREATED);
	}
	
	
	@RequestMapping(method = RequestMethod.PUT, value = "/albuns", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Album> atualizarAlbum(@RequestBody Album album) {
		
		return new ResponseEntity<Album>(albumService.adicionar(album), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/albuns", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Album>> buscarTodosAlbuns() {
		
		return new ResponseEntity<>(albumService.buscarTodos(), HttpStatus.OK);
	}


}
