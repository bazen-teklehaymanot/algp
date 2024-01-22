import { faker } from "@faker-js/faker";
import { Company } from "./company-slice";

// A mock function to mimic making an async request for data
export function fetchCompanies(amount = 1): Promise<{ data: Company[] }> {
    return new Promise<{ data: Company[] }>((resolve) =>
        setTimeout(() => {
            const companies: Company[] = Array.from({ length: amount }, () => ({
                id: faker.datatype.uuid(),
                name: faker.company.name(),
                domain: faker.internet.domainName(),
                revenue: faker.number.int({ min: 100_000, max: 1000_000 }),
                numberOfEmployees: faker.number.int({ min: 1000, max: 10_000 }),
            }));

            resolve({ data: companies });
        }, 500)
    );
}