import React from 'react';		//gerekli importlar yapılır
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


var OgrenciEkle = React.createClass({

	getInitialState: function() {
		//datamız
		return {
			addObject: {
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
    //render fonksiyonumuz
	render: function() {
		//burada model return edilir
		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Öğrenci Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Öğrenci İsim</ControlLabel>
							<FormControl
								type="text"
								placeholder="İsim"
								value={this.state.addObject.isim}
								onChange={this.onAddOgrenciIsimChange} />
							<br />
							
							<ControlLabel>Öğrenci Soyisim</ControlLabel>
							<FormControl
								type="text"
								placeholder="Soyisim"
								value={this.state.addObject.soyisim}
								onChange={this.onAddOgrenciSoyisimChange} />
							<br />
							
							<ControlLabel>Öğrenci Cinsiyet</ControlLabel>
							<FormControl
								type="text"
								placeholder="Cinsiyet"
								value={this.state.addObject.cinsiyet}
								onChange={this.onAddOgrenciCinsiyetChange} />
							<br />

							<ControlLabel>Öğrenci Telefon</ControlLabel>
							<FormControl
								type="text"
								placeholder="Telefon"
								value={this.state.addObject.telefon}
								onChange={this.onAddOgrenciTelefonChange} />
							<br />

							<ControlLabel>Öğrenci Okul No</ControlLabel>
							<FormControl
								type="text"
								placeholder="Okul No"
								value={this.state.addObject.okulNo}
								onChange={this.onAddOgrenciOkulNoChange} />
							<br />

							<ControlLabel>Öğrenci Mail</ControlLabel>
							<FormControl
								type="text"
								placeholder="Mail"
								value={this.state.addObject.mail}
								onChange={this.onAddOgrenciMailChange} />
							<br />
							<ControlLabel>Öğrenci Doğum Tarihi</ControlLabel>
							<FormControl
								type="date"
								placeholder="Tarih"
								value={this.state.addObject.dogumtarih}
								onChange={this.onAddOgrenciDogumTarihChange} />
							<br />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Kapat</Button>
					<Button bsStyle="primary" onClick={this.onEkleBtnClicked}>Ekle</Button>						
				</Modal.Footer>				
			</Modal>
		);
	},

	//addObject içerisi temizlenir
	clearAddObject: function() {
		
		this.state.addObject.id = '';
		this.state.addObject.isim = '';
		this.state.addObject.soyisim = '';
		this.state.addObject.cinsiyet = '';
		this.state.addObject.telefon = '';
		this.state.addObject.okulNo = '';
		this.state.addObject.mail = '';
		this.state.addObject.dogumtarih = '';

	},

	//fomrda bir alanda input değişikliğini yakalayan fonksiyonlarımız
	//anlık olarak addObject içerisindeki değere denk gelen data güncellenir
	onAddOgrenciIsimChange: function(event) {
		this.state.addObject.isim = event.target.value;
		this.forceUpdate();
	},

	onAddOgrenciSoyisimChange: function(event) {
		this.state.addObject.soyisim = event.target.value;
		this.forceUpdate();
	},

	onAddOgrenciCinsiyetChange: function(event) {
		this.state.addObject.cinsiyet = event.target.value;
		this.forceUpdate();
	},
	onAddOgrenciTelefonChange: function(event) {
		this.state.addObject.telefon = event.target.value;
		this.forceUpdate();
	},
	onAddOgrenciOkulNoChange: function(event) {
		this.state.addObject.okulNo = event.target.value;
		this.forceUpdate();
	},
	onAddOgrenciMailChange: function(event) {
		this.state.addObject.mail = event.target.value;
		this.forceUpdate();
	},
	onAddOgrenciDogumTarihChange: function(event) {
		this.state.addObject.dogumtarih = event.target.value;
		this.forceUpdate();
	},

	
	//kullanıcı ekle butonuna bastığında 
	onEkleBtnClicked: function() {

		//Servera post isteği atılır ve addObject yollanır
		axios.post('http://localhost:8080/ogrenciekle/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();//modal kapatılır
				this.props.parent.refreshTable();//tablo güncellenir
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default OgrenciEkle;