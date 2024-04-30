package com.example.demo.model;
import java.io.Serializable;

import com.example.demo.Repository.entity.EstadoEntity;

import lombok.Data;

@Data
public class EstadoDTO implements Serializable{
    private static final long serialVersionUID = 1L;
    private int id;
    private String estado;
    private int idsolicitud;
  
    public static EstadoDTO convertToDTO(EstadoEntity estadoEntity) {
        EstadoDTO estadoDTO = new EstadoDTO();
        estadoDTO.setId(estadoEntity.getId());
        estadoDTO.setEstado(estadoEntity.getEstado());
        estadoDTO.setIdsolicitud(estadoEntity.getIdsolicitud());
        return estadoDTO;

    
}
public static EstadoEntity convertToEntity(EstadoDTO estadoDTO) {
    EstadoEntity estadoEntity = new EstadoEntity();
    estadoEntity.setId(estadoDTO.getId());
    estadoEntity.setEstado(estadoDTO.getEstado());
    estadoEntity.setIdsolicitud(estadoDTO.getIdsolicitud());
    
    return estadoEntity;
    }
    public EstadoDTO() {
        super();
    }
    
    }