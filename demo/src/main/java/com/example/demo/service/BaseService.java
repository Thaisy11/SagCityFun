package com.example.demo.service;

import java.util.List;

import com.example.demo.Repository.entity.SolicitudesEntity;


public interface BaseService<E> {

    public List<E> findAll();

    public E findById(Long id);

    public E save(E entity);

    public E update(Long id, E entity);

    public boolean delete(Long id);

    public List<E> findActivos();
    public List<E> findRechazados();
    public List<E> findPasados();
    public List<E> findPendientes();




}