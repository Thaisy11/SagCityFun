package com.example.demo.web.controller;

import com.example.demo.Repository.dao.SolicitudesRepository;
import com.example.demo.Repository.dao.UsuarioRepository;
import com.example.demo.Repository.entity.SolicitudesEntity;
import com.example.demo.Repository.entity.UsuarioEntity;
import com.example.demo.service.SolicitudesService;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/solicitudes")
public class SolicitudesController {

    @Autowired
    private SolicitudesService solicitudesService;

    @Autowired
    private SolicitudesRepository solicitudesRepository;

    @GetMapping("/activas")
    public List<SolicitudesEntity> activas() {
        List<SolicitudesEntity> sol_activas = solicitudesService.findActivos();
        return sol_activas;
    }

    @GetMapping("/pasadas")
    public List<SolicitudesEntity> pasadas() {
        List<SolicitudesEntity> sol_pasadas = solicitudesService.findPasados();
        return sol_pasadas;
    }

    @GetMapping("/pendientes")
    public List<SolicitudesEntity> pendientes() {
        List<SolicitudesEntity> sol_pendientes = solicitudesService.findPendientes();
        return sol_pendientes;
    }
    @GetMapping("/rechazadas")
    public List<SolicitudesEntity> rechazadas() {
        List<SolicitudesEntity> sol_rechazadas = solicitudesService.findRechazados();
        return sol_rechazadas;
    }

    @PostMapping(path = "/nueva", consumes = "application/json")
    public ResponseEntity<SolicitudesEntity> solicitud (@RequestBody SolicitudesEntity nueva){


        solicitudesService.save(nueva);
        return ResponseEntity.ok(nueva);
    }
    @GetMapping("/posicionamiento")
    public ResponseEntity<?> contarSolicitudesPorPosicionamiento() {
        int conteo1 = solicitudesService.contarSolicitudesPrecioPosicionamiento1();
        int conteo2 = solicitudesService.contarSolicitudesPrecioPosicionamiento2();
        int conteo3 = solicitudesService.contarSolicitudesPrecioPosicionamiento3();

        // Puedes estructurar los conteos en un objeto JSON
        Map<String, Integer> conteos = new HashMap<>();
        conteos.put("conteo1", conteo1);
        conteos.put("conteo2", conteo2);
        conteos.put("conteo3", conteo3);

        return ResponseEntity.ok(conteos);
    }
    @GetMapping("/posicionamiento/{fecha}")
    public int contarSolicitudesPrecioPosicionamientoPorFecha(@PathVariable String fecha) {
        return solicitudesService.contarSolicitudesPrecioPosicionamientoPorFecha(LocalDate.parse(fecha));
    }




}



