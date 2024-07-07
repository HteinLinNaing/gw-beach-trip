import React from 'react';
import PhotoGallery from '../components/Gallery';
import { Container } from 'react-bootstrap';

const GalleryPage = () => {
	return (
		<Container>
			<h2 className="text-center mt-2">Gallery</h2>
			<PhotoGallery />
		</Container>
	);
};

export default GalleryPage;
