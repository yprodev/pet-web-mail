import { FC, memo } from 'react'
import Grid from '@mui/material/Grid'

import { ViewAreaToolbar } from '../'
import { Email } from '../'
import useViewArea, { isEmail, isEmailId } from './useViewArea'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  const { email, emailId, toggleEmailReadState } = useViewArea()

  console.log('show real email: ', email)

  return (
    <Grid
      item
      xs={7}
      sx={{ bgcolor: 'Background.default' }}
      key={isEmailId(emailId) ? emailId : 'something'}
    >
      <ViewAreaToolbar handleClick={toggleEmailReadState} />
      {/* {isFullEmail(fullEmail) && <Email email={fullEmail} />} */}
      {isEmail(email) && <Email email={email} />}
    </Grid>
  )
}

export default memo(ViewArea)
