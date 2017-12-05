package com.example.SAP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SAP.model.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long>{

}
