import React from 'react';
import { shallow } from 'enzyme';

import TrackEntry from './';

describe('TrackEntry', () => {
    let component = null;
    const mockTrack = {
        artistName: 'test artist',
        trackName: 'test song',
        trackPrice: 1,
        trackId: 'testId',
        artworkUrl30: 'testUrl',
        currency: 'USD',
    };

    describe('while loading', () => {
        beforeEach(() => {
            fetch = jest.fn(() => new Promise());
            component = shallow(<TrackEntry
                track={mockTrack}
            />);
        });

        test('should render the track details', () => {
            expect(component.find('.track-entry__content-artworkUrl30').props().src).toEqual(
                'testUrl',
            );
            expect(component.find('.track-entry__content-title').text()).toEqual(
                'Title: test song',
            );
            expect(component.find('.track-entry__content-artistName').text()).toEqual(
                'Artist: test artist',
            );
            expect(component.find('.track-entry__content-trackPrice').text()).toEqual(
                '$1',
            );
        });

        test('should render a Link to TrackDetails', () => {
            expect(component.find('.track-entry__details').find('Link').props().to).toEqual(
                '/trackDetails/testId',
            );
        });
    });
});
