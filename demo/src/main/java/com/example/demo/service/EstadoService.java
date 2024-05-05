package com.example.demo.service;


import com.example.demo.Repository.entity.EstadoEntity;
import com.example.demo.Repository.entity.SolicitudesEntity;
import com.example.demo.Repository.dao.EstadoRepository;
import com.example.demo.Repository.entity.EstadoEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService implements BaseService<EstadoEntity> {

    @Autowired
    EstadoRepository estadoRepository;

    @Override
    @Transactional
    public List<EstadoEntity> findAll() {
        List<EstadoEntity> estado = estadoRepository.findAll();
        return estado;
    }

    @Override
    @Transactional

    public EstadoEntity findById(Long id) {
        Optional<EstadoEntity> optionalEstado = estadoRepository.findById(id);
        return optionalEstado.get();
    }

    @Override
    @Transactional

    public EstadoEntity save(EstadoEntity estado) {
        estado = estadoRepository.save(estado);
        return estado;
       
    }

    @Override
    @Transactional

    public EstadoEntity update(Long id, EstadoEntity entity) {
        Optional<EstadoEntity> optionalEstado = estadoRepository.findById(id);
        EstadoEntity estado = optionalEstado.get();
        estado = estadoRepository.save(estado);
        return estado;
    }

    @Override
    @Transactional

    public boolean delete(Long id) {
      
        if (estadoRepository.existsById(id)){
            estadoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<EstadoEntity> findActivos() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findActivos'");
    }

    @Override
    public List<EstadoEntity> findRechazados() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findRechazados'");
    }

    @Override
    public List<EstadoEntity> findPasados() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findPasados'");
    }

    @Override
    public List<EstadoEntity> findPendientes() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findPendientes'");
    }

     
    
}

    
