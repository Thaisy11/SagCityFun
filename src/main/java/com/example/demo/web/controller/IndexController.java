package com.example.demo.web.controller;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IndexController {


    @GetMapping("/SaguntoCityFun")
    public String mostrarIndex(Model model) {
        return "home"; 
    }

    @GetMapping("/SaguntoCityFun/login")
    public String login() {
        return "login";
    }

    @GetMapping("/SaguntoCityFun/registro")
    public String registro() {
        return "registro";
    }
    @GetMapping("/SaguntoCityFun/pago")
    public String pago() {
        return "pago";
    }
    @GetMapping("/SaguntoCityFun/nuevoEvento")
    public String nuevoEvento() {
        return "nuevoEvento";
    }
    @GetMapping("/SaguntoCityFun/eventos")
    public String eventos() {
        return "eventos";
    }
    @GetMapping("/SaguntoCityFun/admin_solicitudes")
    public String admin_solicitudes() {
        return "admin_solicitudes";
    }
    @GetMapping("/SaguntoCityFun/admin_rechazados")
    public String admin_rechazados() {
        return "admin_rechazados";
    }
    @GetMapping("/SaguntoCityFun/admin_pasados")
    public String admin_pasados() {
        return "admin_pasados";
    }
    @GetMapping("/SaguntoCityFun/admin_activos")
    public String admin_activos() {
        return "admin_activos";
    }
    





    
}
