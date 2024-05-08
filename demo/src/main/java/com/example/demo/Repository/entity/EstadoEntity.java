package com.example.demo.Repository.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Data
@Table(name = "Estado", schema = "SagCityFun", catalog = "")
public class EstadoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   /* @Column(name = "id")
    private Long id;
    @Basic
    @Column(name = "estado")
    private String estado;
    @Basic
    @Column(name = "idsolicitud")
    private int idsolicitud;*/
    private Long id;
    private String estado;
    private int idsolicitud;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        EstadoEntity other = (EstadoEntity) obj;
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

    public EstadoEntity() {
        super();
    }

}
