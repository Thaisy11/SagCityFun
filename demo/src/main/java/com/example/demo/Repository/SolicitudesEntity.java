package com.example.demo.Repository;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
@Table(name = "Solicitudes", schema = "SagCityFun", catalog = "")
public class SolicitudesEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int idsolicitudes;
    @Basic
    @Column(name = "nombre")
    private String nombre;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "contraseña")
    private String contraseña;

    @Column(name = "idpago")
    private int idusuario;
    @OneToOne(mappedBy = "idpago")
    
    @OneToMany(mappedBy = "idSolicitudes")
    private Collection<SolicitudesEntity> solicitudbyUsuarCollection;

    
}
