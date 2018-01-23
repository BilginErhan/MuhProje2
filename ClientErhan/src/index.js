import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/MainTemplate';
import Ogrenci from './pages/Ogrenci';


ReactDOM.render(
	<Router history={browserHistory}>
	<Route path="/" component={MainTemplate}>
		<Route path="/Ogrenci" components={{main: Ogrenci}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
