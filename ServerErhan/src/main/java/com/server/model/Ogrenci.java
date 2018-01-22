package com.server.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
//model sınıf burada database tablosunun sınıfı oluşturulur
@Entity
@Table(name = "Ogrenci")//tablo ismi belirlenir
public class Ogrenci {
	@Id//primary key olduğu belirtilir
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")//kolon ismi
	private Integer id;//değişken
	
	@Column(name  = "isim")
	private String isim;
	
	@Column(name  = "soyisim")
	private String soyisim;
	
	@Column(name = "okulNo")
	private String okulNo;
	
	@Column(name = "cinsiyet")
	private String cinsiyet;
	
	@Column(name = "dogumtarih")
	private String dogumtarih;
	
	@Column(name  = "telefon")
	private String telefon;
	
	@Column(name  = "mail")
	private String mail;


	
	//değişkenlerin getter ve setter methodları
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIsim() {
		return isim;
	}

	public void setIsim(String isim) {
		this.isim = isim;
	}

	public String getSoyisim() {
		return soyisim;
	}

	public void setSoyisim(String soyisim) {
		this.soyisim = soyisim;
	}


	public String getOkulNo() {
		return okulNo;
	}

	public void setOkulNo(String okulNo) {
		this.okulNo = okulNo;
	}

	public String getCinsiyet() {
		return cinsiyet;
	}

	public void setCinsiyet(String cinsiyet) {
		this.cinsiyet = cinsiyet;
	}

	public String getDogumtarih() {
		return dogumtarih;
	}

	public void setDogumtarih(String dogumtarih) {
		this.dogumtarih = dogumtarih;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}


	
}
