package com.example.demo.web.controller;

import com.example.demo.Repository.dao.SolicitudesRepository;
import com.example.demo.Repository.dao.UsuarioRepository;
import com.example.demo.service.SolicitudesService;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/solicitudes")
public class SolicitudesController {

    @Autowired
    private SolicitudesService solicitudesService;

    @Autowired
    private SolicitudesRepository solicitudesRepository;








}
