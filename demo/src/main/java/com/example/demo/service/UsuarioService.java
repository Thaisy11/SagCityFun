package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.Repository.dao.UsuarioRepository;
import com.example.demo.Repository.entity.UsuarioEntity;

import jakarta.transaction.Transactional;
@Service
public class UsuarioService implements BaseService<UsuarioEntity> {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public List<UsuarioEntity> findAll() {
        List<UsuarioEntity> usuarios = usuarioRepository.findAll();
        return usuarios;


    }

    @Override
    @Transactional

    public UsuarioEntity findById(Long id) {
        Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(id);
        return optionalUsuario.get();


    }

    @Override
    @Transactional

    public UsuarioEntity save(UsuarioEntity usuario) {
        usuario = usuarioRepository.save(usuario);
        return usuario;
    }

    @Override
    @Transactional

    public UsuarioEntity update(Long id, UsuarioEntity entity) {
        Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(id);
        UsuarioEntity usuario = optionalUsuario.get();
        usuario = usuarioRepository.save(usuario);
        return usuario;
    }

    @Override
    @Transactional

    public boolean delete(Long id) {
        if(usuarioRepository.existsById(id)){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;


    }

   
  
    
}


