package com.example.demo.service;

import java.time.LocalDate;
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
    public int contarSolicitudesPrecioPosicionamiento3();
   public int contarSolicitudesPrecioPosicionamiento1();
   public int  contarSolicitudesPrecioPosicionamiento2();



    public int contarSolicitudesPrecioPosicionamientoPorFecha(LocalDate fecha);
}
