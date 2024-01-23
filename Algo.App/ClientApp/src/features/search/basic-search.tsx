import { useBasicSearch } from "./search-hook";
import { SearchResultTable } from "./search-result-table";



export function BasicSearch() {
    const result = useBasicSearch();

    return (
        <SearchResultTable 
            title="Basic Similarity" 
            result={result} />
    );
}