package com.example.SAP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SAP.model.Artista;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {

}
