package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Repository.dao.SolicitudesRepository;
import com.example.demo.Repository.entity.SolicitudesEntity;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class SolicitudesService implements Base2Service<SolicitudesEntity> {

    @Autowired
    SolicitudesRepository solicitudesRepository;

    @Override
    public List<SolicitudesEntity> findAll() {
        List<SolicitudesEntity> solicitudes = solicitudesRepository.findAll();
        return solicitudes;
    }

    @Override
    @Transactional
    public SolicitudesEntity findById(Long id) {
        Optional<SolicitudesEntity> optionalSolicitud = solicitudesRepository.findById(id);
        return optionalSolicitud.get();
    }

    @Override
    @Transactional

    public SolicitudesEntity save(SolicitudesEntity solicitud) {
        solicitud = solicitudesRepository.save(solicitud);
        return solicitud;
    }

    @Override
    @Transactional

    public SolicitudesEntity update(Long id, SolicitudesEntity entity) {
        Optional<SolicitudesEntity> optionalSolicitud = solicitudesRepository.findById(id);
        SolicitudesEntity solicitud = optionalSolicitud.get();
        solicitud = solicitudesRepository.save(solicitud);
        return solicitud;

    }

    @Override
    @Transactional

    public boolean delete(Long id) {
       
        if(solicitudesRepository.existsById(id)){
            solicitudesRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<SolicitudesEntity> findActivos() {
        List<SolicitudesEntity> solicitudes_activas = solicitudesRepository.activo();
        return solicitudes_activas;
    }

    @Override
    public List<SolicitudesEntity> findRechazados() {
        List<SolicitudesEntity> solicitudes = solicitudesRepository.rechazado();
        return solicitudes;
    }

    @Override
    public List<SolicitudesEntity> findPasados() {
        List<SolicitudesEntity> solicitudes = solicitudesRepository.pasado();
        return solicitudes;
    }

    @Override
    public List<SolicitudesEntity> findPendientes() {
        List<SolicitudesEntity> solicitudes = solicitudesRepository.pendiente();
        return solicitudes;
    }

}
