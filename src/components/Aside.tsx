import { FC } from 'react'
import Grid from '@mui/material/Grid'

interface AsideProps {}

const Aside: FC<AsideProps> = () => {
  return (
    <Grid item xs={2} sx={{ outline: '1px solid blue' }}>
      Aside element
    </Grid>
  )
}

export default Aside
