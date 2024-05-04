package com.example.demo.service;

import java.util.List;

import com.example.demo.Repository.entity.UsuarioEntity;
import com.example.demo.model.UsuarioDTO;

public interface UsuarioService {
        List <UsuarioService> findAll();

        UsuarioDTO findById(UsuarioDTO usuarioDTO);

        UsuarioDTO save(UsuarioDTO usuarioDTO);

        UsuarioDTO findById(int id);

    void save(UsuarioEntity usuarioEntity);
    
}


