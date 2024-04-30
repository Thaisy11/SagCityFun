package com.example.demo.Repository.entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "Estado", schema = "SagCityFun", catalog = "")
public class EstadoEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "estado")
    private String estado;
      @Basic
    @Column(name = "idsolicitud")
    private int idsolicitud;
    @OneToOne(mappedBy = "idsolicitud")

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        EstadoEntity other = (EstadoEntity) obj;
        if (id != other.id)
            return false;
        return true;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }
    public EstadoEntity() {
        super();
    }
    
   
    
}
