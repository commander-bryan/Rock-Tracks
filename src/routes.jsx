import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import HomeRoute from './pages/Home/routes';
import TracksRoute from './pages/Tracks/routes';
import TrackDetailsRoute from './pages/TrackDetails/routes';

const Routes = () => (
    <Router>
        <Switch>
            {HomeRoute}
            {TracksRoute}
            {TrackDetailsRoute}
        </Switch>
    </Router>
);

export default Routes;
