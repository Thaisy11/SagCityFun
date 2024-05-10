package com.example.demo.service;

import java.util.List;

public interface Base2Service <SolicitudesEntity> {

 public List<SolicitudesEntity> findAll();

    public SolicitudesEntity findById(Long id);

    public SolicitudesEntity save( SolicitudesEntity entity);

    public SolicitudesEntity update(Long id, SolicitudesEntity entity);

    public boolean delete(Long id);

    public List<SolicitudesEntity> findActivos();
    public List<SolicitudesEntity> findRechazados();
    public List<SolicitudesEntity> findPasados();
    public List<SolicitudesEntity> findPendientes();



    
}
