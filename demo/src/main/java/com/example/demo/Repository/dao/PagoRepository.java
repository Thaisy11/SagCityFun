package com.example.demo.Repository.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import jakarta.transaction.Transactional;

@Repository
@Transactional
public class PagoRepository extends JpaRepository<PagoEntity, Integer>{


    
}

