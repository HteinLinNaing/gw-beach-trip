import React, { useState, useEffect, useRef } from 'react';
import Gallery from 'react-photo-gallery';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'react-bootstrap';
import Compressor from 'compressorjs';
import './Gallery.css';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get('https://gw-beach-trip-backend.vercel.app/photos');
            setPhotos(response.data.map(photo => ({
                src: photo.base64,
                width: photo.width,
                height: photo.height,
                id: photo.id
            })));
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleUpload = async (event) => {
        const files = Array.from(event.target.files);
        const compressedFiles = await Promise.all(files.map(file => compressFile(file)));
        const newPhotos = await Promise.all(compressedFiles.map(async file => {
            const base64 = await convertToBase64(file);
            const dimension = await getPhotoDimension(file);
            return {
                id: uuidv4(),
                width: dimension.width,
                height: dimension.height,
                base64
            };
        }));
        await Promise.all(newPhotos.map(photo => axios.post('https://gw-beach-trip-backend.vercel.app/photos', photo)));
        fetchPhotos();

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const compressFile = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.5, // Adjust the quality as needed (0 to 1)
                success(result) {
                    resolve(result);
                },
                error(err) {
                    console.error('Error compressing file:', err);
                    reject(err);
                }
            });
        });
    };

    const getPhotoDimension = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const dimensions = {
                        width: img.width,
                        height: img.height
                    };
                    resolve(dimensions);
                };
                img.onerror = (error) => {
                    reject(error);
                };
                img.src = e.target.result;
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleDelete = async (photoId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://gw-beach-trip-backend.vercel.app/photos/${photoId}`);
                fetchPhotos();
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        }
    };

    const imageRenderer = ({ index, photo, margin }) => {
        return (
            <div
                key={photo.id}
                style={{
                    margin,
                    position: 'relative',
                    display: 'inline-block',
                    width: photo.width,
                    height: photo.height
                }}
            >
                <img src={photo.src} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
                <button className="delete-button" onClick={() => handleDelete(photo.id)}>Delete</button>
            </div>
        );
    };

    return (
        <div>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>
                    Upload Photos
                    <span className="privacy-notice">
                        (By uploading photos, you acknowledge that they will be publicly accessible. Please do not upload any personal or sensitive information.)
                    </span>
                </Form.Label>
                <Form.Control type="file" ref={fileInputRef} accept="image/*" multiple onChange={handleUpload} />
            </Form.Group>
            <Gallery photos={photos} renderImage={imageRenderer} />
        </div>
    );
};

export default React.memo(PhotoGallery);
