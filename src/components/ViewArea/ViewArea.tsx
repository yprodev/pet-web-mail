import { FC } from 'react'
import Grid from '@mui/material/Grid'

import { ViewAreaToolbar } from '../'
import { Email } from '../'
import useViewArea, { isFullEmail } from './useViewArea'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  const { fullEmail, toggleEmailReadState } = useViewArea()

  return (
    <Grid item xs={7} sx={{ bgcolor: 'Background.default' }}>
      <ViewAreaToolbar handleClick={toggleEmailReadState} />
      {isFullEmail(fullEmail) && <Email email={fullEmail} />}
    </Grid>
  )
}

export default ViewArea
