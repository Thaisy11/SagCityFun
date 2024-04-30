package com.example.demo.model;


import java.io.Serializable;

import com.example.demo.Repository.entity.PagoEntity;


import lombok.Data;

@Data
public class PagoDTO implements Serializable{

    private int id;
    private int posicionamiento;
    private int idsolicitud;
    


 public static PagoDTO convertToDTO(PagoEntity pagoEntity) {
    PagoDTO pagoDTO = new PagoDTO();
    pagoDTO.setId(pagoEntity.getId());
    pagoDTO.setPosicionamiento(pagoEntity.getPosicionamiento());
    pagoDTO.setIdsolicitud(pagoEntity.getIdsolicitud());
   
        return pagoDTO;

    
}

public static PagoEntity convertToEntity(PagoDTO pagoDTO) {
    PagoEntity pagoEntity = new PagoEntity();
    pagoEntity.setId(pagoDTO.getId());
    pagoEntity.setPosicionamiento(pagoDTO.getPosicionamiento());
    pagoEntity.setIdsolicitud(pagoDTO.getIdsolicitud());
   
        return pagoEntity;

    
}

public PagoDTO() {
    super();
}




}
