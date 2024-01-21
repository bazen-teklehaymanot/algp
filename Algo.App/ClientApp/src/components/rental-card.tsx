import { useState, Fragment } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Star from '@mui/icons-material/Star';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import CountrySelector from './country-selector';


type RentalCardProps = {
  category: React.ReactNode;
  image: string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
};

export default function RentalCard(props: RentalCardProps) {
  const { category, title, rareFind = false, liked = false, image } = props;
  const [isLiked, setIsLiked] = useState(liked);
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: 'space-between' }}
      flexWrap="wrap"
      sx={{ minWidth: 0 }}
    >
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          bgcolor: 'neutral.softBg',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          '&:hover': {
            boxShadow: 'lg',
            borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          },
        }}
        onClick={() => setOpenDetails(true)}
      >
        <CardOverflow
          sx={{
            mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
            mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
            '--AspectRatio-radius': {
              xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
              sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
            },
          }}
        >
          <AspectRatio
            ratio="1"
            flex
            sx={{
              minWidth: { sm: 120, md: 160 },
              '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
            }}
          >
            <img alt="" src={image} />
            <Stack
              alignItems="center"
              direction="row"
              sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
            >
              {rareFind && (
                <Chip
                  variant="soft"
                  color="success"
                  startDecorator={<WorkspacePremiumRoundedIcon />}
                  size="md"
                >
                  Rare find
                </Chip>
              )}
              <IconButton
                variant="plain"
                size="sm"
                color={isLiked ? 'danger' : 'neutral'}
                onClick={() => setIsLiked((prev) => !prev)}
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  ml: 'auto',
                  borderRadius: '50%',
                  zIndex: '20',
                }}
              >
                <FavoriteRoundedIcon />
              </IconButton>
            </Stack>
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography level="body-sm">{category}</Typography>
              <Typography level="title-md">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  {title}
                </Link>
              </Typography>
            </div>
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
          <Stack
            spacing="0.25rem 1rem"
            direction="row"
            useFlexGap
            flexWrap="wrap"
            sx={{ my: 0.25 }}
          >
            <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
              Collingwood VIC
            </Typography>
            <Typography level="body-xs" startDecorator={<KingBedRoundedIcon />}>
              1 bed
            </Typography>
            <Typography level="body-xs" startDecorator={<WifiRoundedIcon />}>
              Wi-Fi
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ mt: 'auto' }}>
            <Typography
              level="title-sm"
              startDecorator={
                <Fragment>
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.200' }} />
                </Fragment>
              }
              sx={{ display: 'flex', gap: 1 }}
            >
              4.0
            </Typography>
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$540</strong> <Typography level="body-md">total</Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>


      <Drawer open={openDetails} onClose={() => setOpenDetails(false)} anchor='right' >
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <CountrySelector />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto',
              gap: 1,
            }}
          >
            <FormLabel htmlFor="filters-start-date">Start date</FormLabel>
            <div />
            <FormLabel htmlFor="filters-end-date">End date</FormLabel>

            <Input
              id="filters-start-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
            <Box sx={{ alignSelf: 'center' }}>-</Box>
            <Input
              id="filters-end-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
          </Box>
        </Stack>
      </Drawer>

    </Stack>
  );
}
