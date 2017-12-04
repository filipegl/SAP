package com.example.SAP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Playlist {
	
	@Id 
	@GeneratedValue
	Long id;
	String nome;
	Musica[] musicas;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Musica[] getMusicas() {
		return musicas;
	}

	public void setMusicas(Musica[] musicas) {
		this.musicas = musicas;
	}

	

}
