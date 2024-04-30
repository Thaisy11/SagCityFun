package com.example.demo.Repository.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "Solicitudes", schema = "SagCityFun", catalog = "")
public class SolicitudesEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int idsolicitudes;
    @Basic
    @Column(name = "nombre_evento")
    private String nombre_evento;
    @Basic
    @Column(name = "local")
    private String local;
    @Basic
    @Column(name = "dia")
    private String dia;

    @Basic
    @Column(name = "hora")
    private String hora;

    @Basic
    @Column(name = "precio")
    private String precio;

    @Basic
    @Column(name = "link")
    private String link;

    @Basic
    @Column(name = "idpago")
    private int idpago;
    @OneToOne(mappedBy = "idpago")
    
    @Basic
    @Column(name = "idestado")
    private int idestado;
    @OneToOne(mappedBy = "idestado")


    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SolicitudesEntity other = (SolicitudesEntity) obj;
        if (idsolicitudes != other.idsolicitudes)
            return false;
        return true;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + idsolicitudes;
        return result;
    }
    public SolicitudesEntity() {
        super();
    }
   
        
  




    }
    
 

    

