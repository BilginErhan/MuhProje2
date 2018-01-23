import React from 'react';		//gerekli importlar yapılır
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var OgrenciDetay = React.createClass({//detay classı oluşturulur

	getInitialState: function() {

		return {
			detayObject: {
				id: '', 
				isim: '', 
				soyisim: '', 
				cinsiyet: '',
				telefon:'',
				okulNo:'',
				mail:'',
				dogumtarih:''
			},
		}
    },
    //render edilen form modalımız
	render: function() {

		return (
			<Modal show={this.props.parent.state.showDetayModal}>
				<Modal.Header>
					<Modal.Title>Öğrenci Detay</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Öğrenci İsim</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.isim}/>
							<br />
							
							<ControlLabel>Öğrenci Soyisim</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.soyisim}/>
							<br />
							
							<ControlLabel>Öğrenci Cinsiyet</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.cinsiyet}/>
							<br />

							<ControlLabel>Öğrenci Telefon</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.telefon}/>
							<br />

							<ControlLabel>Öğrenci Okul No</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.okulNo}/>
							<br />

							<ControlLabel>Öğrenci Mail</ControlLabel>
							<FormControl
								disabled
								type="text"
								value={this.state.detayObject.mail}/>
							<br />
							<ControlLabel>Öğrenci Doğum Tarihi</ControlLabel>
							<FormControl
								disabled
								type="date"
								value={this.state.detayObject.dogumtarih}/>
							<br />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeDetayModal}>Kapat</Button>					
				</Modal.Footer>				
			</Modal>
		);
	},

	//detayObject temizleme fonksiyonumuz
	clearDetayObject: function() {
		
		this.state.detayObject.id = '';
		this.state.detayObject.isim = '';
		this.state.detayObject.soyisim = '';
		this.state.detayObject.cinsiyet = '';
		this.state.detayObject.telefon = '';
		this.state.detayObject.okulNo = '';
		this.state.detayObject.mail = '';
		this.state.detayObject.dogumtarih = '';

	},

	//detayObject doldurma fonksiyonumuz
	fillDetayObject: function() {

		//sadece detay sayfasında bu get isteği kullanılmıştır 
		//Ogrenciguncelle.js de zaten ogrenci.js de datamız mevcut ordan çekilir
		//sadece burda tek kayıt çekildiği gösterilmektedir.
		//this.props.parent.state.selectedOgrenciId öğrenci sayfasında seçilen kaydın idsidir
		//servera bu id ile istek atılır ve detayObject e yüklenir.
    	axios.get('http://localhost:8080/ogrenciler/'+this.props.parent.state.selectedOgrenciId)
			.then(function (ogrenciler) {
				this.setState({detayObject: ogrenciler.data});
		}.bind(this));
	},
});

export default OgrenciDetay;