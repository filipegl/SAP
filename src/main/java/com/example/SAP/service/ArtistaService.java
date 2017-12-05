package com.example.SAP.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SAP.model.Artista;
import com.example.SAP.repository.ArtistaReposiroty;

@Service
public class ArtistaService {
	
	@Autowired
	ArtistaReposiroty artistaReposiroty;
	
	public Artista adicionar(Artista artista) {
		return artistaReposiroty.save(artista);
	}

	public Collection<Artista> buscarTodos() {
		return artistaReposiroty.findAll();
	}

}
