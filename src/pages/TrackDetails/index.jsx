import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import msToMsAndSs from '../../helpers/millisecondsToMinutesAndSeconds'

import './TrackDetails.css';

class TrackDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            track: {},
            loading: true,
        }
    }

    componentDidMount() {
        fetch(`http://itunes.apple.com/lookup?id=${this.props.computedMatch.params.trackId}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    track: data.results[0],
                    loading: false,
                });
            });
    }

    getCurrencySymbol(track) {
        switch (track.currency) {
            case 'USD':
                return '$';
            case 'GBP':
                return '£';
            default:
                return '£';
        }
    }

    renderTrack() {
        const track= this.state.track;
        return track ? (
            <div className="track-details">
                <div className="track-details__header">
                    <img className="track-details__header-artworkUrl100" src={track.artworkUrl100}></img>
                    <h1 className="track-details__header-title">{track.trackName}</h1>
                </div>
                <div className="track-details__content">
                    <span className="track-details__content-artistName">Artist: {track.artistName}</span>
                    <span className="track-details__content-trackPrice">{this.getCurrencySymbol(track)}{track.trackPrice}</span>
                    <span className="track-details__content-duration">Duration: {msToMsAndSs(track.trackTimeMillis)}</span>
                    <span className="track-details__content-release">Released: {moment(track.releaseDate).format('DD-MM-YYYY')}</span>
                    <a className="track-details__content-itunes" href={track.trackViewUrl}>More details at iTunes</a>
                </div>
            </div>
        ) : ( <span>Track details failed to load</span>);
    }

    renderLoading() {
        return (
            <h2>Loading...</h2>
        );
    }

    render() {
        return (
            <div className="tracks">
                {this.state.loading ? this.renderLoading() : this.renderTrack()}
            </div>
        )
    }
}

TrackDetails.propTypes = {
    computedMatch: PropTypes.shape({
        params: PropTypes.shape({
            trackId: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default TrackDetails;