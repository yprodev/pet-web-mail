import { FC } from 'react'
import Grid from '@mui/material/Grid'

interface EmailListProps {}

const EmailList: FC<EmailListProps> = () => {
  return (
    <Grid item xs={3} sx={{ outline: '1px solid red' }}>
      Email List
    </Grid>
  )
}

export default EmailList
