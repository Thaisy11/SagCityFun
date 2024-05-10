package com.example.demo.Repository.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@Table(name = "usuario", schema = "SagCityFun", catalog = "")
public class UsuarioEntity {

 @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
   /* @Column(name = "id")
    private Long id;
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
    private Collection<SolicitudesEntity> solicitudbyUsuarCollection;*/
  
    private Long id;
    private String nombre;
    private String email;
    private String contrasena;
    private String rol;
    




    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UsuarioEntity other = (UsuarioEntity) obj;
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

    public UsuarioEntity() {
        super();
    }
 
    

    
    
}
