/*package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.dao.EstadoRepository;
import com.example.demo.Repository.entity.EstadoEntity;
import com.example.demo.model.EstadoDTO;;

@Service
public class EstadoServiceImp implements EstadoService {
    
private static final Logger log = LoggerFactory.getLogger(EstadoServiceImp.class);

    @Autowired
    private EstadoRepository estadoRepository;

 @Override
    public List<EstadoDTO> findAll() {
        log.info("EstadoServiceImpl - findAll: Lista de todas las empresas");

        return estadoRepository.findAll()
                .stream()
                .map(EstadoDTO::convertToDTO)
                .collect(Collectors.toList());

    }

@Override
@Transactional

public EstadoDTO findById(EstadoDTO estadoDTO) {
    log.info("EstadoServiceImpl - findById: Lista de estado por id");

    Optional<EstadoEntity> estadoEntity = estadoRepository.findById(estadoDTO.getId());
    if (estadoEntity.isPresent()) {
        estadoDTO = EstadoDTO.convertToDTO(estadoEntity.get());
        return estadoDTO;
    } else {
        return null;
    }
}




@Override
@Transactional
public EstadoEntity save(EstadoDTO estadoDTO) {
    log.info("EstadoServiceImpl - save: Guardamos Estado");

        if (estadoDTO != null) {
            EstadoEntity estadoEntity = estadoDTO.convertToEntity(estadoDTO);
            return estadoRepository.save(estadoEntity);
        } else {
            throw new IllegalArgumentException("El objeto estadoDTO no puede ser nulo");
        }
}



@Override
@Transactional

public void save(EstadoEntity estadoEntity) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'save'");
}



}*/
