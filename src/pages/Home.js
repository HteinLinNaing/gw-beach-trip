import React from 'react';
import Countdown from '../components/Countdown';
import { Container } from 'react-bootstrap';
import './Home.css';

const Home = () => {

    return (
        <div className='home-page'>
            <Container className="text-center">
                <div className='overlay'></div>
                <div className='content'>
                    <h1 className='mb-4'>Global Wave Technology</h1>
                    <h1 className='title-text'>Countdown to Beach Trip</h1>
                    <Countdown/>
                </div>
            </Container>
        </div>
    );
};

export default Home;
