package com.example.SAP.service;

import java.util.Collection;
import java.util.List;

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
	
	public Album albumDoRepository(Album album) {
		List<Album> albunsComMesmoNome = albumRepository.getAlbunsPorNome(album.getNome());
		Album albumBuscado = null;
		
		for (Album a : albunsComMesmoNome) {
			if (a.getArtista().toUpperCase().equals(album.getArtista().toUpperCase())){
				albumBuscado = a;
			}
		}
		return albumBuscado;
	}

}
