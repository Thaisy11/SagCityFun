
package com.example.demo.Repository.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Repository.entity.SolicitudesEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface SolicitudesRepository extends JpaRepository<SolicitudesEntity, Long>{


    
}
