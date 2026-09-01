import {parseYaku} from './utils.js';

describe('Mahjong Function Testing', () => {
    describe('parseYaku()', () => {
        
        test('Should  return ["2s", "3s", "4s", "4s", "2p", "3p", "4p", "6p", "7p", "8p", "2m", "3m", "4m", "6m"]', () => {
            expect(parseYaku("2344s234678p2346m")).toEqual(["2s", "3s", "4s", "4s", "2p", "3p", "4p", "6p", "7p", "8p", "2m", "3m", "4m", "6m"]);
        });

        test('Should  return ["2p", "3p", "4p", "2p", "3p", "4p", "6p", "7p", "2m", "3m", "4m", "6m", "6m"]', () => {
            expect(parseYaku("23423467p234667m")).toEqual(["2p", "3p", "4p", "2p", "3p", "4p", "6p", "7p", "2m", "3m", "4m", "6m", "6m", "7m"]);
        });

        test('Should  return "Not a hand"', () => {
            expect(parseYaku("23s234678p23411z")).toEqual("Not a hand");
        });

        test('Should  return ["2m", "3m", "4m", "3m", "2m", "3m", "4m", "6m", "7m", "2m", "3m", "4m", "6m", "6m"]', () => {
            expect(parseYaku("23432346723466m")).toEqual(["2m", "3m", "4m", "3m", "2m", "3m", "4m", "6m", "7m", "2m", "3m", "4m", "6m", "6m"]);
        });

        test('Should  return ["2s", "3s", "4s", "2p", "3p", "4p", "6p", "7p", "8p", "2m", "3m", "6m"]', () => {
            expect(parseYaku("234s234678p236m66z")).toEqual(["2s", "3s", "4s", "2p", "3p", "4p", "6p", "7p", "8p", "2m", "3m", "6m"]);
        });
    });
});