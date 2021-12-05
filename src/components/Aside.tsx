import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

interface AsideProps {}

const buttonStyle: SxProps<Theme> = {
  display: 'flex',
  color: 'common.white',
  fontWeight: 'bold',
}

const Aside: FC<AsideProps> = () => {
  return (
    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', pt: 8, bgcolor: 'background.paper' }}>
      <Button
        sx={{
          ...buttonStyle,
          my: 4,
        }}
        key='one'
      >
        Inbox
      </Button>
      <Button sx={buttonStyle} key='two'>
        Snoozed
      </Button>
      <Button sx={buttonStyle} key='three'>
        Sent
      </Button>
      <Button sx={buttonStyle} key='three'>
        Trash
      </Button>
    </Grid>
  )
}

export default Aside
