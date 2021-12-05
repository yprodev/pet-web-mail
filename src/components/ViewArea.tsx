import { FC } from 'react'
import Grid from '@mui/material/Grid'

import { ViewAreaToolbar } from '.'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  return (
    <Grid item xs={7} sx={{ bgcolor: 'Background.default' }}>
      <ViewAreaToolbar />
    </Grid>
  )
}

export default ViewArea
