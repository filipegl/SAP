package com.example.SAP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SAP.model.Playlist;

@Repository
public interface PlaylistReposiroty extends JpaRepository<Playlist, Long> {

}
