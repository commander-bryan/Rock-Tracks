import React from 'react';
import TrackDetails from './';

const route = <TrackDetails
    path="/trackDetails/:trackId"
    exact
    render={(props) => <TrackDetails {...props} />}
    key={TrackDetails}/>;

export default route;
