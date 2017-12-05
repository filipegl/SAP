package com.example.SAP.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SAP.model.Playlist;
import com.example.SAP.repository.PlaylistReposiroty;

@Service
public class PlaylistService {
	
	@Autowired
	PlaylistReposiroty playlistRepository;
	
	public Collection<Playlist> buscarTodas() {
		return playlistRepository.findAll();
	}

	public Playlist adicionar(Playlist playlist) {
		System.out.println("Salvando PL no repository...");
		
		return playlistRepository.save(playlist);
	}
	

	public Collection<Playlist> deletar(Long id) {
		playlistRepository.delete(id);
		return buscarTodas();
	}

	

}
