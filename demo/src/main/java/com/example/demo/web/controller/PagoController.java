package com.example.demo.web.controller;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.PagoService;
import com.example.demo.service.UsuarioService;
import com.example.demo.Repository.dao.PagoRepository;
import com.example.demo.Repository.dao.UsuarioRepository;
import com.example.demo.Repository.entity.PagoEntity;
import com.example.demo.Repository.entity.UsuarioEntity;

@RestController
@RequestMapping("/pagos")
public class PagoController {

 private static final Logger log = LoggerFactory.getLogger(PagoController.class);

    @Autowired
    private PagoService pagoService;

    @Autowired
    private PagoRepository pagoRepository;
    
    @GetMapping
    public List<PagoEntity> findAll(){
        return pagoService.findAll();
    }

    @GetMapping(path = "/{id}")
    public PagoEntity findById(@PathVariable("id") Long id) {
        PagoEntity pago = new PagoEntity();
        pago.setId(id);
        Optional<PagoEntity> OptionalPago = Optional.ofNullable(pagoService.findById(pago.getId()));
        if (OptionalPago.isEmpty()){
            return null;
        } else {
            return OptionalPago.get();
        }


    }
 @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<PagoEntity> pago(@PathVariable Long id, @RequestBody PagoEntity pago){
        if (id == null){
            return ResponseEntity.badRequest().build();
        }
        pago.setId(id);
        pagoService.save(pago);
        return ResponseEntity.ok(pago);
    }
  

   




    

    
}
