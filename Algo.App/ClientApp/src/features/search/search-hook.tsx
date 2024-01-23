import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { levenshteinCost } from "../../core/levenshtein-distance";
import { Company } from "../companies/company-service";

export interface CompanyMatchResult extends Company {
    distance: number
}

export function useLevenshteinDistanceMatch(): CompanyMatchResult[] {
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

export function useBasicSearch(): CompanyMatchResult[] {
    const { value: companies } = useAppSelector(state => state.company_state);
    const filterName = useAppSelector(state => state.globalFilter.name);
    const results = useMemo<CompanyMatchResult[]>(() => {
        const results = companies.filter(company => company.name.toLowerCase().includes(filterName.toLowerCase()));
        return results.map(r => ({ ...r, distance: 1}));
    }, [companies, filterName]);

    return results;
}