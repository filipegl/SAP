package com.example.SAP.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SAP.model.Album;
import com.example.SAP.repository.AlbumRepository;

@Service
public class AlbumService {

	@Autowired
	AlbumRepository albumRepository;
	
	public Collection<Album> buscarTodos() {
		return albumRepository.findAll();
	}

	public Album adicionar(Album album) {
		return albumRepository.save(album);
	}

}
