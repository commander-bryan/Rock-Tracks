import React from 'react';
import { Link } from 'react-router-dom';
import TrackEntry from '../../components/TrackEntry/'

import './Tracks.css';

class Tracks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch('https://itunes.apple.com/search?term=rock&media=music')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                tracks: data,
                loading: false,
            });
        });
    }

    renderTracks() {
        return (
            <div className="tracks__results">
                {this.state.tracks.results.map(track => <TrackEntry key={track.trackId} track={track} />)}
            </div>
        );
    }

    renderLoading() {
        return (
            <h2>Loading...</h2>
        );
    }

    render() {
        return (
            <div className="tracks">
                <div className="tracks__description">
                    <h1 className="tracks__description-heading">Rock Tracks</h1>
                    <span className="tracks__description-about">The following tracks have been found for the search term "rock"</span>
                </div>
                {this.state.loading ? this.renderLoading() : this.renderTracks()}
            </div>
        )
    }
}

Tracks.propTypes = {
};

export default Tracks;