import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './TrackEntry.css';

const TrackEntry = (props) => {
    const getCurrencySymbol = (track) => {
        switch (track.currency) {
            case 'USD':
                return '$';
            case'GBP':
                return '£';
            default:
                return '£';
        }
    }

    const {
        track
    } = props;

    return (
        <div className="track-entry">
            <div className="track-entry__content">
                <img className="track-entry__content-artworkUrl30" alt="album cover" src={track.artworkUrl30}></img>
                <span className="track-entry__content-title">Title: {track.trackName}</span>
                <span className="track-entry__content-artistName">Artist: {track.artistName}</span>
                <span className="track-entry__content-trackPrice">{getCurrencySymbol(track)}{track.trackPrice}</span>
            </div>
            <div className="track-entry__details">
                <Link to={`/trackDetails/${track.trackId}`}>Details</Link>
            </div>
        </div>
    )
}

TrackEntry.propTypes = {
    track: PropTypes.shape({
        artistName: PropTypes.string.isRequired,
        trackName: PropTypes.string.isRequired,
        trackPrice: PropTypes.number.isRequired,
        trackId: PropTypes.number.isRequired,
        artworkUrl30: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
};

export default TrackEntry;