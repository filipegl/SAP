package com.example.SAP.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SAP.model.Artista;
import com.example.SAP.repository.ArtistaRepository;

@Service
public class ArtistaService {
	
	@Autowired
	ArtistaRepository artistaRepository;
	
	public Artista adicionar(Artista artista) {
		return artistaRepository.save(artista);
	}

	public Collection<Artista> buscarTodos() {
		return artistaRepository.findAll();
	}

}
