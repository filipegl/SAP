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

import com.example.SAP.model.Playlist;
import com.example.SAP.service.PlaylistService;

@RestController
public class PlaylistController {
	
	@Autowired
	PlaylistService playlistService;

	@RequestMapping(method = RequestMethod.POST, value = "/playlist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Playlist> adicionarPlaylist(@RequestBody Playlist playlist) {
		Playlist playlistAdicionada = playlistService.adicionar(playlist);
		return new ResponseEntity<Playlist>(playlistAdicionada, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/playlist", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Playlist>> buscarTodasPlaylists() {

		Collection<Playlist> playlistsBuscadas = playlistService.buscarTodas();
		return new ResponseEntity<>(playlistsBuscadas, HttpStatus.OK);
	}

}
