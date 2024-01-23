import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { NavBar } from './components/navbar';
import { Grid } from '@mui/joy';
import { ClusteringVisualization } from './features/clustering/meanshift-visualization';
import { LevenshteinDistanceMatch } from './features/search/levenshtein-search';
import { BasicSearch } from './features/search/basic-search';
import { usePeriodicIngest } from './features/utils/ingest';


export function VisualizationContainer() {
  usePeriodicIngest();
  
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Grid container spacing={2} sx={{ flexGrow: 1, height: 'calc(100vh - 55px)' }}>
        <Grid xs={6}>
          <Stack sx={{ pl: 2, pt: 2, minHeight: 0, height: '100%' }}>
            <ClusteringVisualization 
              title='Mean Shift' />
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack sx={{ pt: 2, pr: 2, minHeight: 0, height: '100%' }}>
            <Grid container spacing={2} sx={{ flexGrow: 1, height: '100%' }}>
              <Grid xs={12}>
                <BasicSearch/>
              </Grid>
              <Grid xs={12}>
                <LevenshteinDistanceMatch/>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        
      </Grid>
    </CssVarsProvider >
  );
}
