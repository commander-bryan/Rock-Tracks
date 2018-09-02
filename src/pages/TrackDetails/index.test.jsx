import React from 'react';
import { shallow } from 'enzyme';

import TrackDetails from './';

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    });
};

describe('TrackDetails', () => {
    let component = null;
    const mockParams = {
        params: {
            trackId: 'testId',
        },
    };

    const mockTrack = JSON.stringify({
        artworkUrl100: 'testArtUrl',
        trackName: 'test track',
        artistName: 'test artist',
        trackPrice: 1,
        trackTimeMillis: 1,
        releaseDate: '2013-03-05T08:00:00Z',
        trackViewUrl: 'testTrackUrl',
        currency: 'USD',
    });

    describe('when no track data returned', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, '{ "results": []}')));
            component = shallow(<TrackDetails
                computedMatch={mockParams}
            />);
        });

        test('should render the Track', () => {
            expect(component.text()).toEqual(
                'Track details failed to load',
            );
        });
    });

    describe('when track data returned successfully', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(200, null, `{ "results": [${mockTrack}]}`)));
            component = shallow(<TrackDetails
                computedMatch={mockParams}
            />);
        });

        test('should render the Track', () => {
            expect(component.find('.track-details__header-artworkUrl100').props().src).toEqual('testArtUrl');
            expect(component.find('.track-details__header-title').text()).toEqual('test track');
            expect(component.find('.track-details__content-artistName').text()).toEqual('Artist: test artist');
            expect(component.find('.track-details__content-trackPrice').text()).toEqual('$1');
            expect(component.find('.track-details__content-duration').text()).toEqual('1');
            expect(component.find('.track-details__content-release').text()).toEqual('Released: 05-03-2013');
            expect(component.find('.track-details__content-itunes').props().href).toEqual('testTrackUrl');
        });
    });
});
