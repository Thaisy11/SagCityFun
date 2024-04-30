package com.example.demo.Repository;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
@Table(name = "usuario", schema = "SagCityFun", catalog = "")
public class UsuarioEntity {

 @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int idusuario;
    @Basic
    @Column(name = "nombre")
    private String nombre;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "contrasena")
    private String contrasena;
    @Basic
    @Column(name = "rol")
    private String rol;
    
    @OneToMany(mappedBy = "idSolicitudes")
    private Collection<SolicitudesEntity> solicitudbyUsuarCollection;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UsuarioEntity other = (UsuarioEntity) obj;
        if (idusuario != other.idusuario)
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + idusuario;
        return result;
    }

    public UsuarioEntity() {
        super();
    }
 
    

    
    
}
