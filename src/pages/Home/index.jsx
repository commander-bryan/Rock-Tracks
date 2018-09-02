import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="app">
        <h1>Rock Tracks</h1>
        <span>This app will fetch a list of rock tracks from iTunes and allow you to view details about each</span>
        <Link to="/tracks">Click here to start</Link>
    </div>
)

export default Home;