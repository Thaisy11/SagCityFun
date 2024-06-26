package com.example.demo.web.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.UsuarioService;
import com.example.demo.Repository.dao.UsuarioRepository;
import com.example.demo.Repository.entity.UsuarioEntity;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

 private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping
    public List<UsuarioEntity> findAll(){
        return usuarioService.findAll();
    }

    @GetMapping(path = "/{id}")
    public UsuarioEntity findById(@PathVariable("id") Long id) {
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setId(id);
        Optional<UsuarioEntity> OptionalUsuario = Optional.ofNullable(usuarioService.findById(usuario.getId()));
        if (OptionalUsuario.isEmpty()){
            return null;
        } else {
            return OptionalUsuario.get();
        }


    }
 @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<UsuarioEntity> usuario(@PathVariable Long id, @RequestBody UsuarioEntity usuario){
        if (id == null){
            return ResponseEntity.badRequest().build();
        }
        usuario.setId(id);
        usuarioService.save(usuario);
        return ResponseEntity.ok(usuario);
    }
  @PostMapping(path = "/registro")
    public ResponseEntity<UsuarioEntity> registro(@RequestBody UsuarioEntity usuario){
        if (usuario == null){
            return ResponseEntity.badRequest().build();
        }
        usuarioService.save(usuario);
        return ResponseEntity.ok(usuario);
    }

    @PutMapping(path = "/")
    public ResponseEntity<UsuarioEntity> actualizarHorario(@RequestBody UsuarioEntity usuario){
        if (usuario.getId() == null || !usuarioRepository.existsById(usuario.getId())){
            return ResponseEntity.badRequest().build();
        }
        usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuario);
    }


    }




    
