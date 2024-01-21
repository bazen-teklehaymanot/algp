import { Box, IconButton } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ColorSchemeToggle from './color-scheme-toggle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Input from '@mui/joy/Input';

export function NavBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton size="sm" variant="soft">
          <MapsHomeWorkIcon />
        </IconButton>
        <Typography level="title-md">ALGO</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search company…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: {
              xs: 'none',
              sm: 'flex',
            },
            width: 400
          }}
        />
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
    </Box>
  );
}
