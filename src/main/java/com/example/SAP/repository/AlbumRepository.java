package com.example.SAP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.SAP.model.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>{
	
	@Query(value="select a from Album a where UPPER(a.nome) = UPPER(:pnome)")
	public List<Album> getAlbunsPorNome(@Param("pnome") String nome);
}
