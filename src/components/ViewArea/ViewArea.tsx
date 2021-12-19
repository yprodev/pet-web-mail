import { FC, memo } from 'react'
import Grid from '@mui/material/Grid'

import { ViewAreaToolbar } from '../'
import { Email } from '../'
import useViewArea, { isEmail, isEmailId } from './useViewArea'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  const { email, emailId, toggleEmailReadState } = useViewArea()

  return (
    <Grid
      item
      xs={7}
      sx={{ p: 3, bgcolor: 'Background.default' }}
      key={isEmailId(emailId) ? emailId : 'something'}
    >
      {isEmail(email) && (
        <ViewAreaToolbar handleClick={toggleEmailReadState} isRead={email.meta.isRead} />
      )}
      {isEmail(email) && <Email email={email} />}
    </Grid>
  )
}

export default memo(ViewArea)
