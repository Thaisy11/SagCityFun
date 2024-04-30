package com.example.demo.Repository.entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "Pago", schema = "SagCityFun", catalog = "")
public class PagoEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "posicionamiento")
    private int posicionamiento;


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
        PagoEntity other = (PagoEntity) obj;
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

    public PagoEntity() {
        super();

    }
   
    
    
}
