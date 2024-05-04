/*package com.example.demo.model;
import java.io.Serializable;

import com.example.demo.Repository.entity.UsuarioEntity;

import lombok.Data;

@Data
public class UsuarioDTO implements Serializable{
    private static final long serialVersionUID = 1L;


    private int id;
  
    private String nombre;

    private String email;
  
    private String contrasena;
  
    private String rol;


 public static UsuarioDTO convertToDTO(UsuarioEntity usuarioEntity) {
    UsuarioDTO usuarioDTO = new UsuarioDTO();
    usuarioDTO.setId(usuarioEntity.getId());
    usuarioDTO.setNombre(usuarioEntity.getNombre());
    usuarioDTO.setEmail(usuarioEntity.getEmail());
    usuarioDTO.setContrasena(usuarioEntity.getContrasena());
    usuarioDTO.setRol(usuarioEntity.getRol());
        return usuarioDTO;

    
}

public static UsuarioEntity convertToEntity(UsuarioDTO usuarioDTO) {
    UsuarioEntity usuarioEntity = new UsuarioEntity();
    usuarioEntity.setId(usuarioDTO.getId());
    usuarioEntity.setNombre(usuarioDTO.getNombre());
    usuarioEntity.setEmail(usuarioDTO.getEmail());
    usuarioEntity.setContrasena(usuarioDTO.getContrasena());
    usuarioEntity.setRol(usuarioDTO.getRol());
    return usuarioEntity;
    }

public UsuarioDTO() {
    super();
}




}
*/