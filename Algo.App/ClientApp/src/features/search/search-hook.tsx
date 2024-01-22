import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { levenshteinCost } from "../../core/levenshtein-distance";
import { Company } from "../companies/company-slice";

interface LevenshteinDistanceMatchResult extends Company {
    distance: number
}

export function useLevenshteinDistanceMatch(input: string): LevenshteinDistanceMatchResult[] {
    const { value: companies } = useAppSelector(state => state.company_state);
    const lvdmr = useMemo(() => {
        const query = "apple";
        const results = companies.map(company => {
            const distance = levenshteinCost(query, company.name);
            return { ...company, distance };
        });
        results.sort((a, b) => a.distance - b.distance);

        console.log('HOOK',{ results })
        return results;
    }, [companies]);

    return lvdmr;
}