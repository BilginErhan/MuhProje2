import React from 'react';		//gerekli importlar yapılır
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var OgrenciGuncelle = React.createClass({

	getInitialState: function() {
		//datalarımız
		return {
			updateObject: {
				id: '', 
				isim: '', 
				soyisim: '', 
				cinsiyet: '',
				telefon:'',
				okulNo:'',
				mail:'',
				dogumtarih:''
			}
		}
    },

    shouldComponentUpdate: function() {
    	//console.log('EU:shouldComponentUpdate');
    	//return this.props.parent.state.showUpdateModal;
    	return true;
    },
    //render fonksiyonumuz
	render: function() {
		//modal formumuz geri döndürülür
		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Öğrenci Güncelle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Öğrenci İsim</ControlLabel>
							<FormControl
								type="text"
								placeholder="İsim"
								value={this.state.updateObject.isim}
								onChange={this.onUpdateOgrenciIsimChange} />
							<br />
							
							<ControlLabel>Öğrenci Soyisim</ControlLabel>
							<FormControl
								type="text"
								placeholder="Soyisim"
								value={this.state.updateObject.soyisim}
								onChange={this.onUpdateOgrenciSoyisimChange} />
							<br />
							
							<ControlLabel>Öğrenci Cinsiyet</ControlLabel>
							<FormControl
								type="text"
								placeholder="Cinsiyet"
								value={this.state.updateObject.cinsiyet}
								onChange={this.onUpdateOgrenciCinsiyetChange} />
							<br />

							<ControlLabel>Öğrenci Telefon</ControlLabel>
							<FormControl
								type="text"
								placeholder="Telefon"
								value={this.state.updateObject.telefon}
								onChange={this.onUpdateOgrenciTelefonChange} />
							<br />

							<ControlLabel>Öğrenci Okul No</ControlLabel>
							<FormControl
								type="text"
								placeholder="Okul No"
								value={this.state.updateObject.okulNo}
								onChange={this.onUpdateOgrenciOkulNoChange} />
							<br />

							<ControlLabel>Öğrenci Mail</ControlLabel>
							<FormControl
								type="text"
								placeholder="Mail"
								value={this.state.updateObject.mail}
								onChange={this.onUpdateOgrenciMailChange} />
							<br />
							<ControlLabel>Öğrenci Doğum Tarihi</ControlLabel>
							<FormControl
								type="date"
								placeholder="Tarih"
								value={this.state.updateObject.dogumtarih}
								onChange={this.onUpdateOgrenciDogumTarihChange} />
							<br />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeGuncelleModal}>Kapat</Button>
					<Button bsStyle="primary" onClick={this.onGuncelleBtnClicked}>Güncelle</Button>						
				</Modal.Footer>
			</Modal>
		);
	},

	//ogrenci.js deki id ye ait kayıt cekilerek selectedOgrenci ye aktarılır
	//ve bu datalar updateObject te tutulur
	fillUpdateObject: function() {

    	var selectedOgrenci = this.props.parent.getOgrenciById(this.props.parent.state.selectedOgrenciId);

		this.state.updateObject = {
			id : selectedOgrenci.id,
			isim: selectedOgrenci.isim, 
			soyisim: selectedOgrenci.soyisim, 
			cinsiyet: selectedOgrenci.cinsiyet,
			telefon : selectedOgrenci.telefon, 
			okulNo: selectedOgrenci.okulNo,
			mail : selectedOgrenci.mail,
			dogumtarih : selectedOgrenci.dogumtarih
		}
	},

	//updateObject datası temizlenir
	clearUpdateObject: function() {

		this.state.updateObject.isim = '';
		this.state.updateObject.soyisim = '';
		this.state.updateObject.cinsiyet = '';
		this.state.updateObject.telefon = '';
		this.state.updateObject.okulNo = '';
		this.state.updateObject.mail = '';
		this.state.updateObject.dogumtarih = '';
	},

	//herehangi bir input u algıladığında ilgili
	//updateObject alanda güncelleme yapar
	onUpdateOgrenciIsimChange: function(event) {
		this.state.updateObject.isim = event.target.value;
		this.forceUpdate();
	},

	onUpdateOgrenciSoyisimChange: function(event) {
		this.state.updateObject.soyisim = event.target.value;
		this.forceUpdate();
	},

	onUpdateOgrenciCinsiyetChange: function(event) {
		this.state.updateObject.cinsiyet = event.target.value;
		this.forceUpdate();		
	},
	onUpdateOgrenciTelefonChange: function(event) {
		this.state.updateObject.telefon = event.target.value;
		this.forceUpdate();		
	},
	onUpdateOgrenciOkulNoChange: function(event) {
		this.state.updateObject.okulNo = event.target.value;
		this.forceUpdate();		
	},
	onUpdateOgrenciMailChange: function(event) {
		this.state.updateObject.mail = event.target.value;
		this.forceUpdate();		
	},
	onUpdateOgrenciDogumTarihChange: function(event) {
		this.state.updateObject.dogumtarih = event.target.value;
		this.forceUpdate();		
	},
			
	//Güncelle butonuna basıldığında
	onGuncelleBtnClicked: function() {
		
		//Servera put isteği atılır id ve updateObject yollanır
		axios.put('http://localhost:8080/ogrenciGuncelle/' + this.state.updateObject.id, this.state.updateObject)
			.then(function (response) {
				this.props.parent.closeGuncelleModal(); //modal kapatılır
				this.props.parent.refreshTable();//tablo güncellenir
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default OgrenciGuncelle;