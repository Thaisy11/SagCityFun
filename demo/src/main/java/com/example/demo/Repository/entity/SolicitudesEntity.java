package com.example.demo.Repository.entity;

import jakarta.persistence.*;
import lombok.Data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Table(name = "Solicitudes", schema = "SagCityFun", catalog = "")
public class SolicitudesEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;
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
    private Long idpago;
    @OneToOne(mappedBy = "idpago")
    
    @Basic
    @Column(name = "idestado")
    private Long idestado;
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SolicitudesEntity other = (SolicitudesEntity) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }
    public SolicitudesEntity() {
        super();
    }
   
        
  




    }
    
 

    

