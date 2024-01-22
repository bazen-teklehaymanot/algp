import { faker } from '@faker-js/faker';

export interface Company {
    id: string;
    name: string;
    domain: string;
    revenue: number;
    numberOfEmployees: number;
}

// A mock function to mimic making an async request for data
export function fetchCompanies(amount = 1): Promise<{ data: Company[] }> {
    return new Promise<{ data: Company[] }>((resolve) =>
        setTimeout(() => {
            resolve({ data: generateCompanies(amount) });
        }, 500)
    );
}


export function generateCompanies(size: number) {
    // let companies: Company[] = []
    // for (let i = 0; i < size; i++) {
    //     const company: Company = {
    //         // id: faker.string.uuid(),
    //         // name: faker.company.name(),
    //         // domain: faker.internet.domainName(),
    //         // revenue: faker.number.int({ min: 100_000, max: 1000_000 }),
    //         // numberOfEmployees: faker.number.int({ min: 1000, max: 10_000 }),

    //         id: 'faker.string.uuid()',
    //         name: 'faker.company.name()',
    //         domain: 'faker.internet.domainName()',
    //         revenue: 1000_000,
    //         numberOfEmployees: 1000
    //     }
    //     companies = [...companies, company];
    // }
    const companies: Company[] = Array.from({ length: size }, () => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
        domain: faker.internet.domainName(),
        revenue: faker.number.int({ min: 100_000, max: 1000_000 }),
        numberOfEmployees: faker.number.int({ min: 1000, max: 10_000 }),
    }));
    return companies
}