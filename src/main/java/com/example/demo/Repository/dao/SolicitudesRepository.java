
package com.example.demo.Repository.dao;

import java.util.List;
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

    @Query("SELECT s FROM SolicitudesEntity s WHERE s.idestado = 1")
    public List<SolicitudesEntity> activo();


    @Query("SELECT s FROM SolicitudesEntity s JOIN EstadoEntity e ON s.idestado = e.id WHERE e.estado = 'RECHAZADO'")
    public List<SolicitudesEntity> rechazado();

    @Query("SELECT s FROM SolicitudesEntity s JOIN EstadoEntity e ON s.idestado = e.id WHERE e.estado = 'PENDIENTE'")
    public List<SolicitudesEntity> pendiente();

    @Query("SELECT s FROM SolicitudesEntity s JOIN EstadoEntity e ON s.idestado = e.id WHERE e.estado = 'PASADO'")
    public List<SolicitudesEntity> pasado();



    
}
