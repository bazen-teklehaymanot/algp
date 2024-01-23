import {  useLevenshteinDistanceMatch } from "./search-hook";
import { SearchResultTable } from "./search-result-table";



export function LevenshteinDistanceMatch() {
    const result = useLevenshteinDistanceMatch();

    return (
        <SearchResultTable 
            title="Levenshtein Distance" 
            result={result} 
            isLevenshtein/>
    );
}