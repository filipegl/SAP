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
		Album artistaAdicionado = albumService.adicionar(album);
		System.out.println("Passou pel POST quantas vezes?");
		System.out.println("id do POST: " + album.getId());
		return new ResponseEntity<Album>(artistaAdicionado, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/albuns", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Album> atualizarAlbum(@RequestBody Album album) {
		Album artistaAtualizado = albumService.adicionar(album);
		System.out.println("Passou pel PUT quantas vezes?");
		System.out.println("id do PUT: " + album.getId());
		return new ResponseEntity<Album>(artistaAtualizado, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/albuns", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Album>> buscarTodosAlbuns() {

		Collection<Album> albunsBuscados = albumService.buscarTodos();
		return new ResponseEntity<>(albunsBuscados, HttpStatus.OK);
	}


}
