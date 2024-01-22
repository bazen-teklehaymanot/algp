/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Card } from '@mui/joy';
import { LevenshteinVisualizationModal } from './levenshtein-visualization';
import { useLevenshteinDistanceMatch } from './search-hook';
import { useEffect } from 'react';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface ResultData {
    id: string | number,
    name: string,
    score: number
}

interface SearchResultTableProps {
    title?: string,
    data: ResultData[]
}

export function SearchResultTable(props: SearchResultTableProps) {
    const result = useLevenshteinDistanceMatch('Micrt');
    useEffect(()=> {
        console.log({result})
    },[])

    return (
        <Card variant="soft" style={{ height: '100%' }} >
            <Typography level="title-sm" >
                {props.title}
            </Typography>
            <Sheet
                variant="outlined"
                sx={{
                    '--TableCell-height': '40px',
                    // the number is the amount of the header rows.
                    '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                    height: '38vh',
                    overflow: 'auto',
                    borderRadius: '10px',
                    background: (
                      theme,
                    ) => `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                      linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                      radial-gradient(
                        farthest-side at 50% 0,
                        rgba(0, 0, 0, 0.12),
                        rgba(0, 0, 0, 0)
                      ),
                      radial-gradient(
                          farthest-side at 50% 100%,
                          rgba(0, 0, 0, 0.12),
                          rgba(0, 0, 0, 0)
                        )
                        0 100%`,
                    backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local, local, scroll, scroll',
                    backgroundPosition:
                      '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
                    backgroundColor: 'background.surface',
                  }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    size='sm'
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>

                            <th style={{ width: 120, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                >
                                    Cost
                                </Link>
                            </th>
                            <th style={{ width: 240, padding: '12px 6px' }}>Name</th>
                            <th style={{ width: 200, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <Typography level="body-xs">{row.distance}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.name}</Typography>
                                </td>
                                <td>
                                    <LevenshteinVisualizationModal
                                        firstWord={row.name}
                                        secondWord='Micrt'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                   
                </Table>
            </Sheet>
        </Card>
    );
}
