package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.server.model.Ogrenci;
import com.server.repository.ogrenciRepository;

//Contorller rest controller olduğu belirtilir
@RestController
public class Controller {
	
	//Repository eklernir Crud işlemleri için
	@Autowired
	ogrenciRepository ogrencirep;
	
	
	//Access-allow-origin hatası için gelen istekeri açar CrossOrigin
	//Tüm Öğrencileri Listele
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ogrenciler")//ogrenciler şekilde get isteği olursa bu fonksiyon çalışır
	public ResponseEntity<List<Ogrenci>> getOgrenciler(){
		//repository den finall ile tüm data çekilir ve liste aktarılır
		List<Ogrenci> ogrenciler = ogrencirep.findAll();
		//eğer öğrenciler listi boş ise boş json yollanır ve headera httpstatus ok yollanır
		if (ogrenciler.isEmpty()) {
			return new ResponseEntity<List<Ogrenci>>(HttpStatus.OK);
		}
		//data gelirse json formatında data yollanır ve headera httpstatus ok yollanır
		return new ResponseEntity<List<Ogrenci>>(ogrenciler, HttpStatus.OK);
	}
	
	
	//Öğrencilerin bir tanesini getir
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/ogrenciler/{id}")//get isteği fakat verilen id ye göre istek atılır
	public ResponseEntity<Ogrenci> getOgrenci(@PathVariable("id") int id){
		Ogrenci ogrenci = ogrencirep.findById(id);//respositorde id ye göre arama yapılır
		
		if(ogrenci == null) {//eğer kayıt bulamaz ise no_content olarak geri yollanır
			return new ResponseEntity<Ogrenci>(HttpStatus.NO_CONTENT);
		}
		//kayıt bulursa öğrenci datalarını geri yollar
		return new ResponseEntity<Ogrenci>(ogrenci,HttpStatus.OK);
		
	}
	
	
	//Öğrenci Ekleme
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/ogrenciekle")//Post Mapping öğrenci ekleme fonksiyonu
	public ResponseEntity<Void> setOgrenci(@RequestBody Ogrenci ogrenci, UriComponentsBuilder ucBuilder){

		
		ogrencirep.save(ogrenci);//reporsitory ile database e kayıt edilir
		HttpHeaders headers = new HttpHeaders();//headers nesnesi oluşturulur
		headers.setLocation(ucBuilder.path("OgrenciEkle/{id}").buildAndExpand(ogrenci.getId()).toUri());
		//headers nesnesi kullanılmıyor eğer eklenen kayıt eklenirse kullanıcı eklenen kaydın tutulduğu sayfaya
		//yönlendirilebilir
		return new ResponseEntity<Void>(HttpStatus.CREATED);//status created olarak yollanır
	}
	
	//Öğrenci Güncelleme
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/ogrenciGuncelle/{id}")//Put mapping tanımlanır
	public ResponseEntity<Ogrenci> updateOgrenci(@PathVariable("id") int id,@RequestBody Ogrenci ogrenci){
		//öğrenci id ye göre aranır
		Ogrenci ogr = ogrencirep.findById(ogrenci.getId());
		
		if(ogr == null)//eğer boş ise not found ile yollanır
			return new ResponseEntity<Ogrenci>(HttpStatus.NOT_FOUND);
		
		//yeni ogr sınıfı gelen ogrenci sınıf ile güncellenir 
		ogr.setCinsiyet(ogrenci.getCinsiyet());
		ogr.setDogumtarih(ogrenci.getDogumtarih());
		ogr.setIsim(ogrenci.getIsim());
		ogr.setMail(ogrenci.getMail());
		ogr.setOkulNo(ogrenci.getOkulNo());
		ogr.setSoyisim(ogrenci.getSoyisim());
		ogr.setTelefon(ogrenci.getTelefon());
		
		//ve repository yardımı ile kayıt edilir
		ogrencirep.save(ogr);
		
		//güncellenen kayıt ile beraber geri yollanır
		return new ResponseEntity<Ogrenci>(ogr, HttpStatus.OK);
	}
	
	//Öğrenci Sil
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("ogrenciSil/{id}")//delete mapping tanımlanır
	public ResponseEntity<Ogrenci> deleteOgrenci(@PathVariable("id") int id){
		//id ye göre arama yapılır
		Ogrenci ogr = ogrencirep.findById(id);
		
		if(ogr == null)//öğrenci bulamaz ise not_found yollanır
			return new ResponseEntity<Ogrenci>(HttpStatus.NOT_FOUND);
		
		//eğer öğrenci var ise repository yardımıyla öğrenci silinir
		ogrencirep.delete(ogr);
		
		//geriye no_content olarak yollanır
		return new ResponseEntity<Ogrenci>(HttpStatus.NO_CONTENT);
	}

}
