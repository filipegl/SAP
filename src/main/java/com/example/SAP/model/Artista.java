package com.example.SAP.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Artista {
	
	@Id
	@GeneratedValue
	Long id;
	String nome;
	String img;
	boolean favorito;
	Musica ultimaMusica;
	String nota;
	
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
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public boolean isFavorito() {
		return favorito;
	}
	public void setFavorito(boolean favorito) {
		this.favorito = favorito;
	}
	public Musica getUltimaMusica() {
		return ultimaMusica;
	}
	public void setUltimaMusica(Musica ultimaMusica) {
		this.ultimaMusica = ultimaMusica;
	}
	public String getNota() {
		return nota;
	}
	public void setNota(String nota) {
		this.nota = nota;
	}

}
