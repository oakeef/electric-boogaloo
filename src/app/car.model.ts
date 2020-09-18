export const carAttributesMapping = {
    year: 'year',
    brand: 'brand',
    model: 'model',
    bodyStyle: 'bodyStyle',
    storage: 'storage',
    seats: 'seats',
    drive: 'drive',
    battery: 'kwh',
    range: 'range',
    horsePower: 'hp',
    torque: 'tq',
    zeroToSixty: 'zeroToSixty',
    weight: 'weight',
    cost: 'lowestPrice',
    msrp: 'msrp'
    };
  
export interface Car {
    year: number;
    brand: string;
    model: string;
    bodyStyle: string;
    storage: string;
    seats: string;
    drive: string;
    battery: number;
    range: number;
    horsePower: number;
    torque: number;
    zeroToSixty: string;
    weight: string;
    cost: number;
    msrp: number;
};