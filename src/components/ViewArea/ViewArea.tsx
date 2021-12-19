import { FC, memo } from 'react'
import Grid from '@mui/material/Grid'

import { ViewAreaToolbar } from '../'
import { Email } from '../'
import useViewArea, { isEmail, isEmailId } from './useViewArea'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  const { email, emailId, toggleEmailReadState, removeEmail } = useViewArea()

  return (
    <Grid
      item
      xs={7}
      sx={{ p: 3, bgcolor: 'Background.default' }}
      key={isEmailId(emailId) ? emailId : 'something'} //FIXME: What is something?
    >
      {isEmail(email) && (
        <ViewAreaToolbar
          toggleIsRead={toggleEmailReadState}
          removeEmail={removeEmail}
          email={email}
        />
      )}
      {isEmail(email) && <Email email={email} />}
    </Grid>
  )
}

export default memo(ViewArea)
