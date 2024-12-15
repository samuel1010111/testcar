'use strict';

class CarStorage {
    constructor(jsondata) {
        if (!jsondata) throw new Error('data storage missing');
        this.storage = JSON.parse(jsondata);
    }

    has_details(searchKey) {
        if (!searchKey) return false;
        const car = this.storage.find(car => car.ID === searchKey);
        return car ? (car.details && Object.keys(car.details).length > 0) : false;
    }

    get_a_car_matching_ID(searchKey) {
        if (!searchKey) throw new Error('missing parameter');
        return this.storage.find(car => car.ID === searchKey) || null;
    }

    get_details(searchKey) {
        if (!searchKey) return null;
        const car = this.get_a_car_matching_ID(searchKey);
        return car ? car.details || null : null;
    }

    get_total_price_of_cars_by_model(searchValue) {
        if (!searchValue) throw new Error('missing parameter');
        const cars = this.storage.filter(car => car.model === searchValue);
        if (cars.length === 0) throw new Error('nothing found with given searchValue');
        return cars.reduce((total, car) => total + car.price, 0);
    }

    get_Price(ID) {
        const car = this.get_a_car_matching_ID(ID);
        if (!car) throw new Error('nothing found with given searchValue');
        return car.price;
    }
}

module.exports = CarStorage;
