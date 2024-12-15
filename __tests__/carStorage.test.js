'use strict';

const CarStorage = require('../CarStorage');
const fs = require('fs');

const jsondata = fs.readFileSync('./datastorage.json', 'utf8');

describe('CarStorage tests', () => {
    let carStorage;

    beforeAll(() => {
        carStorage = new CarStorage(jsondata);
    });

    test('Constructor should throw an error if no data is passed', () => {
        expect(() => new CarStorage()).toThrow('data storage missing');
    });

    test('has_details should return true if car has details', () => {
        expect(carStorage.has_details(1)).toBe(true);
    });

    test('has_details should return false if car does not have details', () => {
        expect(carStorage.has_details(5)).toBe(false);
    });

    test('has_details should return false if ID is not provided', () => {
        expect(carStorage.has_details()).toBe(false);
    });

    test('get_a_car_matching_ID should return car object if ID matches', () => {
        expect(carStorage.get_a_car_matching_ID(1)).toEqual(expect.objectContaining({ ID: 1 }));
    });

    test('get_a_car_matching_ID should return null if no matching ID is found', () => {
        expect(carStorage.get_a_car_matching_ID(10)).toBe(null);
    });

    test('get_a_car_matching_ID should throw an error if ID is not provided', () => {
        expect(() => carStorage.get_a_car_matching_ID()).toThrow('missing parameter');
    });

    test('get_details should return details object if car has details', () => {
        expect(carStorage.get_details(1)).toEqual(expect.objectContaining({ powerSource: 'gas' }));
    });

    test('get_details should return null if car does not have details', () => {
        expect(carStorage.get_details(5)).toBe(null);
    });

    test('get_total_price_of_cars_by_model should return total price of cars with the same model', () => {
        expect(carStorage.get_total_price_of_cars_by_model('chrome')).toBe(600);
    });

    test('get_total_price_of_cars_by_model should throw an error if no cars with given model are found', () => {
        expect(() => carStorage.get_total_price_of_cars_by_model('nonexistent')).toThrow('nothing found with given searchValue');
    });

    test('get_total_price_of_cars_by_model should throw an error if model is not provided', () => {
        expect(() => carStorage.get_total_price_of_cars_by_model()).toThrow('missing parameter');
    });

    test('get_Price should return price of the car matching given ID', () => {
        expect(carStorage.get_Price(1)).toBe(10);
    });

    test('get_Price should throw an error if no car with given ID is found', () => {
        expect(() => carStorage.get_Price(10)).toThrow('nothing found with given searchValue');
    });
});
