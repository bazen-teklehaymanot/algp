import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { NavBar } from './components/navbar';
import { SearchResultTable } from './features/search/search-result-table';
import { Grid } from '@mui/joy';
import { MeanShiftClustering } from './features/clustering/meanshift-visualization';

const input = 'Micrs';

const ld = [
  {
    id: '05',
    name: 'Microsoft',
    score: 4
  },
  {
    id: '04',
    name: 'Microsemi',
    score: 4
  },
  {
    id: '03',
    name: 'Microchip',
    score: 5
  },
  {
    id: '02',
    name: 'MicroFocus',
    score: 5
  },
  {
    id: '01',
    name: 'MicroStrategy',
    score: 8
  },

]

export function RentalDashboard() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />

      <Grid container spacing={2} sx={{ flexGrow: 1, height: 'calc(100vh - 55px)' }}>
        <Grid xs={6}>
          <Stack sx={{ pl: 2, pt: 2, minHeight: 0, height: '100%' }}>
            <MeanShiftClustering 
              title='Mean Shift' />
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack sx={{ pt: 2, pr: 2, minHeight: 0, height: '100%' }}>
            <Grid container spacing={2} sx={{ flexGrow: 1, height: '100%' }}>
              <Grid xs={12}>
                <SearchResultTable
                  title='Basic Similarity'
                  data={[]}
                />
              </Grid>
              <Grid xs={12}>
                <SearchResultTable
                  title='Levenshtein Distance'
                  data={ld}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </CssVarsProvider >
  );
}
