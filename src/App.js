import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import './App.css';

const App = () => {
	return (
		<Router>
			<div className="App">
				<NavigationBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/gallery" element={<GalleryPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
