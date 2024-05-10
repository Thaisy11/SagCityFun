package com.example.demo.service;

import com.example.demo.Repository.entity.PagoEntity;
import com.example.demo.Repository.entity.SolicitudesEntity;
import com.example.demo.Repository.dao.PagoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoService implements BaseService<PagoEntity> {

    @Autowired
    PagoRepository pagorepository;

    @Override
    @Transactional
    public List<PagoEntity> findAll(){
        List <PagoEntity> pagos = pagorepository.findAll();
        return pagos;
    }

    @Override
    @Transactional

    public PagoEntity findById(Long id) {
       Optional<PagoEntity> pago = pagorepository.findById(id);
       return pago.get();
    }

    @Override
    @Transactional

    public PagoEntity save(PagoEntity pago) {
        pago = pagorepository.save(pago);
        return pago;
       
    }

    @Override
    @Transactional

    public PagoEntity update(Long id, PagoEntity entity) {
        Optional<PagoEntity> optionalpago = pagorepository.findById(id);
        PagoEntity pago = optionalpago.get();
        pago = pagorepository.save(pago);
        return pago;
    }

    @Override
    @Transactional

    public boolean delete(Long id) {
        if(pagorepository.existsById(id)){
            pagorepository.deleteById(id);
            return true;
        }
        return false;
    }

}
