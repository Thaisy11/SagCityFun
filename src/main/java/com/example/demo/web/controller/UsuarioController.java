package com.example.demo.web.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.demo.Repository.entity.SolicitudesEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/u")
public class UsuarioController{

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

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Boolean> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioEntity usuarioActualizado) {
        Optional<UsuarioEntity> optionalUsuario = usuarioRepository.findById(id);

        if (!optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }

        // Obtener la entidad existente
        UsuarioEntity usuario = optionalUsuario.get();

        // Actualizar los campos necesarios
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setContrasena(usuarioActualizado.getContrasena());
        usuario.setEmail(usuarioActualizado.getEmail());

        // Guardar la entidad actualizada
        usuarioRepository.save(usuario);

        // Devolver true indicando que la actualización fue exitosa
        return ResponseEntity.ok(true);
    }





    @PostMapping(path = "/registrar")
    public ResponseEntity<UsuarioEntity> registro(@RequestBody UsuarioEntity usuario){
        if (usuario == null){
            return ResponseEntity.badRequest().build();
        }
        usuarioService.save(usuario);
        return ResponseEntity.ok(usuario);
    }
    @GetMapping("/eventos")
    public String eventos() {
        return "eventos";
    }
        @PostMapping(path = "/iniciarSesion")
        public ResponseEntity<?> iniciarSesion(@RequestBody UsuarioEntity usuario) {
            log.info("Recibido Usuario");

            if (usuario == null || usuario.getContrasena() == null) {
                return ResponseEntity.badRequest().build();
            }

            Optional<UsuarioEntity> usuarioOptional = usuarioService.findByEmail(usuario);
            if (usuarioOptional.isPresent()) {
                UsuarioEntity usuarioEncontrado = usuarioOptional.get();
                if (usuarioEncontrado.getContrasena().equals(usuario.getContrasena())) {
                    return ResponseEntity.ok(usuarioEncontrado);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        }
    }







    
