import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { levenshteinCost } from "../../core/levenshtein-distance";
import { Company } from "../companies/company-service";

interface LevenshteinDistanceMatchResult extends Company {
    distance: number
}

export function useLevenshteinDistanceMatch(): LevenshteinDistanceMatchResult[] {
    const { value: companies } = useAppSelector(state => state.company_state);
    const filterName = useAppSelector(state => state.globalFilter.name);
    const lvdmr = useMemo(() => {
        const results = companies.map(company => {
            const distance = levenshteinCost(filterName, company.name);
            return { ...company, distance };
        });
        results.sort((a, b) => a.distance - b.distance);
        return results;
    }, [companies, filterName]);

    return lvdmr;
}