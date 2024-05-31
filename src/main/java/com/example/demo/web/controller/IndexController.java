package com.example.demo.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {

    @GetMapping("/sinacceso")
    public String sinacceso(Model model) {
        return "sinacceso";
    }


    @GetMapping("/")
    public String mostrarIndex(Model model) {
        return "home"; 
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/registro")
    public String registro() {
        return "registro";
    }
    @GetMapping("/pago")
    public String pago() {
        return "pago";
    }
    @GetMapping("/nuevoEvento")
    public String nuevoEvento() {
        return "nuevoEvento";
    }
    @GetMapping("/eventos")
    public String eventos() {
        return "eventos";
    }
    @GetMapping("/admin_solicitudes")
    public String admin_solicitudes() {
        return "admin_solicitudes";
    }
    @GetMapping("/admin_rechazados")
    public String admin_rechazados() {
        return "admin_rechazados";
    }
    @GetMapping("/admin_pasados")
    public String admin_pasados() {
        return "admin_pasados";
    }
    @GetMapping("/admin_activos")
    public String admin_activos() {
        return "admin_activos";
    }
    @GetMapping("/zona")
    public String zona() {
        return "zona";
    }








}
