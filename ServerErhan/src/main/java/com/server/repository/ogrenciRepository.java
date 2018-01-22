package com.server.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.server.model.Ogrenci;//öğrenci sınıf tanımlanır

public interface ogrenciRepository extends JpaRepository<Ogrenci,Integer>{
//interface imiz jpa repository ile extend edilir
	
	Ogrenci findById(Integer id);//id ye göre bulma fonksiyonumuz

}
