import { FC } from 'react'
import Grid from '@mui/material/Grid'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  return (
    <Grid item xs={7} sx={{ outline: '1px solid green', bgcolor: 'Background.default' }}>
      View Area
    </Grid>
  )
}

export default ViewArea
