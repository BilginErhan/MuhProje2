	import React from 'react';//react import edilir
	import Select from 'react-select';//react select import edilir
	import axios from 'axios';//axios import edilir
	import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';//bootstrap eklenir
	import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';//bootsrap tablosu eklenir

	import OgrenciEkleModal from './OgrenciEkle';//modal sayfaları eklenir
	import OgrenciGuncelleModal from './OgrenciGuncelle';
	import OgrenciDetayModal from './OgrenciDetay';

	var Ogrenci = React.createClass({//Ogrenci classı oluşturulur

		getInitialState: function() {//ilk çalışan fonksiyon data tanımlamalır
			
			return {
				data: null,//json datalarımız bu değişkende
				selectedOgrenciId: null,//id bu dğeişkende
				showAddModal: false,//ekleme modalı
				showUpdateModal: false,//güncelleme modalı
				showDetayModal:false//detay gösterme modalı
			}
	    },
		
		componentDidMount: function() {
			this.refreshTable();//tablo refresh fonksiyonu
		},
		
		render: function() {//render fonksiyonumuz
			var selectRowProp = {//tablodaki radio buton tanımlanır
				mode: "radio",
				clickToSelect: true,
				className: "selected-row",
				bgColor: 'rgb(101, 148, 255)',			
				onSelect: this.onRowSelect
			};		
			
			if(!this.state.data){//gelen data yoksa sadece ekle butonunu göster
				return (<div>
					<ButtonGroup className="m-10">
						<Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" /> Ekle</Button>
					</ButtonGroup>
					<OgrenciEkleModal parent={this} ref="OgrenciEkle" />
					</div>
					
					);
			}
			
			//eğer gelen data var ise tabloyu datalar ile ekrana bas
			return (
				<div>
					<ButtonGroup className="m-10">
						<Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" /> Ekle</Button>
						<Button bsStyle="warning" disabled={this.state.selectedOgrenciId === null} onClick={this.openGuncelleModal}><Glyphicon glyph="refresh" /> Güncelle</Button>
						<Button bsStyle="danger" disabled={this.state.selectedOgrenciId === null} onClick={this.onSilBtnClicked}><Glyphicon glyph="trash" /> Sil</Button>
						<Button bsStyle="info"  disabled={this.state.selectedOgrenciId === null} onClick={this.openDetayModal}><Glyphicon glyph="user" /> Detay</Button>
					</ButtonGroup>
				
					<BootstrapTable data={this.state.data} 
									striped={true} 
									hover={true} 
									pagination={false} 
									search={true} 
									selectRow={selectRowProp}>
						<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Öğrenci ID</TableHeaderColumn>
						<TableHeaderColumn dataField="isim" dataSort={true}>İsim</TableHeaderColumn>
						<TableHeaderColumn dataField="soyisim">Soyisim</TableHeaderColumn>
						<TableHeaderColumn dataField="cinsiyet" >Cinsiyet</TableHeaderColumn>
						<TableHeaderColumn dataField="telefon" >Telefon</TableHeaderColumn>
					</BootstrapTable>
								
					<OgrenciEkleModal parent={this} ref="OgrenciEkle" />

					<OgrenciGuncelleModal parent={this} ref="OgrenciGuncelle"/>

					<OgrenciDetayModal parent={this} ref="OgrenciDetay"/>
				</div>		
			);
		},

		// eğer kullanıcı bir satır seçer ise id si alınır
		onRowSelect: function(row, isSelected) {
			if(isSelected) {
				this.setState({ selectedOgrenciId: row.id });
			}else {
				this.setState({ selectedOgrenciId: null });
			}
		},
		
		
		//ekleme modalı kapatma
		closeAddModal: function() {
			this.setState({ showAddModal: false });//modal kapatılır
			this.refs.OgrenciEkle.clearAddObject();//ogrenciekle.js içerisindeki datalar temizlenir
		},
		//öğrenci ekleme modelı açma
		openAddModal: function() {
			this.refs.OgrenciEkle.clearAddObject();	//ogrenciekle.js içerisindeki datalar temizlenir	
			this.setState({ showAddModal: true });//modal açılır
		},

		//güncelle modeli kapatma
		closeGuncelleModal: function() {
			this.setState({showUpdateModal: false});//modal kapatılır
			this.refs.OgrenciGuncelle.clearUpdateObject();//ogrenciguncelle.js içerisindeki datalar temizlenir
		},
		//güncelle modalı açma
		openGuncelleModal: function() {
			this.refs.OgrenciGuncelle.fillUpdateObject();//ogrenciguncelle.js içerisinde data doldurulur
			this.setState({showUpdateModal: true});//modal açılır
		},

		//detay modelı açma
		openDetayModal:function(){
			this.refs.OgrenciDetay.fillDetayObject(); //ogrencidetay.js içerindeki data doldurulur
			this.setState({showDetayModal:true});//modal açılır
		},
		//detay modelı kapatma
		closeDetayModal:function(){
			this.setState({showDetayModal:false});//modal kapatılır
			this.refs.OgrenciDetay.clearDetayObject();//Ogrencidetay.js datası temizlenir
		},

		//sil butonuna basıldığında
		onSilBtnClicked: function() {
			
			//axios servera delete isteği yollanır ve öğrenci id sini yollar
			axios.delete('http://localhost:8080/ogrenciSil/' + this.state.selectedOgrenciId)
				.then(function (response) {
					this.refreshTable();//eğer başarılı ise tabloyu günceller
				}.bind(this))
				.catch(function (error) {
					console.log(error);//hatalı ise hata console a basılır 
				});		
		},

		//hangi öğrencinin seçildiğini bulmak için kullanılan fonksiyon
		getOgrenciById: function(id) {
			for(var i in this.state.data) {
				if(this.state.data[i].id === id) {
					return this.state.data[i];
				}
			}
			return '';
		},	

		
		//tablo yenileme fonksiyonu
		refreshTable: function() {

			//servera get isteği atılır tüm datalar çekilir
			axios.get('http://localhost:8080/ogrenciler')
				.then(function (ogrenciler) {
					this.setState({data: ogrenciler.data});//eğer başarılır ise gelen data data ya basılır
			}.bind(this));


		}
	});

	export default Ogrenci;