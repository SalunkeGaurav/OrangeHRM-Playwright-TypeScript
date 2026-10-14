
import { faker } from '@faker-js/faker';

export function createEmployeeData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    };
}
