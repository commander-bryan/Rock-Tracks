import millisecondsToMinutesAndSeconds from './millisecondsToMinutesAndSeconds';

describe('millisecondsToMinutesAndSeconds', () => {
    test('converts correctly', () => {
        expect(millisecondsToMinutesAndSeconds(0)).toEqual('0:00');
        expect(millisecondsToMinutesAndSeconds(1000)).toEqual('0:01');
        expect(millisecondsToMinutesAndSeconds(10000)).toEqual('0:10');
        expect(millisecondsToMinutesAndSeconds(100000)).toEqual('1:40');
        expect(millisecondsToMinutesAndSeconds(1000000)).toEqual('16:40');
        expect(millisecondsToMinutesAndSeconds(10000000)).toEqual('166:40');
    })
})