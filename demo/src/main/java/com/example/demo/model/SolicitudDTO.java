package com.example.demo.model;

import java.io.Serializable;

import com.example.demo.Repository.entity.SolicitudesEntity;

import lombok.Data;

@Data
public class SolicitudDTO implements Serializable{
    private static final long serialVersionUID = 1L;
    private int id;
    
    private String nombre_evento;
    
    private String local;
    
    private String dia;

    private String hora;

    private String precio;

    private String link;

    private int idpago;
    
    private int idestado;
  

 public static SolicitudDTO convertToDTO(SolicitudesEntity solicitudesEntity) {
    SolicitudDTO solicitudDTO = new SolicitudDTO();
    solicitudDTO.setId(solicitudesEntity.getId());
    solicitudDTO.setNombre_evento(solicitudesEntity.getNombre_evento());
    solicitudDTO.setLocal(solicitudesEntity.getLocal());
    solicitudDTO.setDia(solicitudesEntity.getDia());
    solicitudDTO.setHora(solicitudesEntity.getHora());
    solicitudDTO.setPrecio(solicitudesEntity.getPrecio());
    solicitudDTO.setLink(solicitudesEntity.getLink());
    solicitudDTO.setIdpago(solicitudesEntity.getIdpago());
    solicitudDTO.setIdestado(solicitudesEntity.getIdestado());
        return solicitudDTO;

    
}

public static SolicitudesEntity convertToEntity(SolicitudDTO solicitudDTO) {
    SolicitudesEntity solicitudesEntity = new SolicitudesEntity();
    solicitudesEntity.setId(solicitudDTO.getId());
    solicitudesEntity.setNombre_evento(solicitudDTO.getNombre_evento());
    solicitudesEntity.setLocal(solicitudDTO.getLocal());
    solicitudesEntity.setDia(solicitudDTO.getDia());
    solicitudesEntity.setHora(solicitudDTO.getHora());
    solicitudesEntity.setPrecio(solicitudDTO.getPrecio());
    solicitudesEntity.setLink(solicitudDTO.getLink());
    solicitudesEntity.setIdpago(solicitudDTO.getIdpago());
    solicitudesEntity.setIdestado(solicitudDTO.getIdestado());
    return solicitudesEntity;
    }

public SolicitudDTO() {
    super();
}




}
