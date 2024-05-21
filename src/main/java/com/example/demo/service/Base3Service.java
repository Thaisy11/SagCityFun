package com.example.demo.service;

import java.util.List;
import java.util.Optional;

public interface Base3Service<UsuarioEntity> {
 public List<UsuarioEntity> findAll();

    public UsuarioEntity findById(Long id);

    public UsuarioEntity save( UsuarioEntity entity);

    public UsuarioEntity update(Long id, UsuarioEntity entity);

    public boolean delete(Long id);
    Optional <UsuarioEntity> findByEmail (UsuarioEntity entity);




    
}
