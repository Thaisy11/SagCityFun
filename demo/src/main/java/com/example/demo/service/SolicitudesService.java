package com.example.demo.service;
import java.util.List;


import com.example.demo.Repository.entity.SolicitudesEntity;
import com.example.demo.model.SolicitudDTO;

public interface SolicitudesService {
    List <SolicitudesService> findAll();

    SolicitudDTO findById(SolicitudDTO solicitudDTO);


    SolicitudDTO save(SolicitudDTO solicitudDTO);

    SolicitudDTO findById(int id);

    void save(SolicitudesEntity solicitudesEntity);
    
}
