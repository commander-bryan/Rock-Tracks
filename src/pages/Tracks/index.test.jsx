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

    const mockTracks = JSON.stringify([
        {
            artworkUrl30: 'testArtUrl1',
            trackName: 'test track 1',
            artistName: 'test artist 1',
            trackPrice: 1,
            trackId: 1,
            currency: 'USD',
        },
        {
            artworkUrl30: 'testArtUrl2',
            trackName: 'test track 2',
            artistName: 'test artist 2',
            trackPrice: 1,
            trackId: 2,
            currency: 'GBP',
        }
    ]);

    describe('when no track data returned', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, '{ "results": []}')));
            component = shallow(<TrackDetails
                computedMatch={mockParams}
            />);
        });

        test('should render the Track', () => {
            expect(component.find('tracks__results').find('TrackEntry')).toHaveLength(0);
        });
    });

    describe('when track data returned successfully', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, `{ "results": ${mockTracks}}`)));
            component = shallow(<TrackDetails
                computedMatch={mockParams}
            />);
        });

        test('should render the first TrackEntry', () => {
            expect(component.find('TrackEntry').at(0).props()).toEqual(
                { "track": 
                    {
                        "artistName": "test artist 1",
                        "artworkUrl30": "testArtUrl1",
                        "currency": "USD",
                        "trackId": 1,
                        "trackName": "test track 1",
                        "trackPrice": 1
                    }
                }
            );
        });

        test('should render the second TrackEntry', () => {
            expect(component.find('TrackEntry').at(1).props()).toEqual(
                {
                    "track":
                    {
                        "artistName": "test artist 2",
                        "artworkUrl30": "testArtUrl2",
                        "currency": "GBP",
                        "trackId": 2,
                        "trackName": "test track 2",
                        "trackPrice": 1
                    }
                }
            );
        });
    });
});
