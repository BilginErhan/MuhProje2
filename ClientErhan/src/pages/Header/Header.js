import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
	render: function() {
		
		return (
			<div className="header">
				<p className="header-info">
					Client React js App Erhan Bilgin
				</p>
				<div className="menu">
					<Link to="/Ogrenci" className="menu-link-item" activeClassName="active">Ogrenci</Link>
				</div>
			</div>

		);
	}
});

export default Header;