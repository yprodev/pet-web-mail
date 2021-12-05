import { FC } from 'react'
import Grid from '@mui/material/Grid'

import { EmailItem } from '.'

interface EmailListProps {}

const EmailList: FC<EmailListProps> = () => {
  return (
    <Grid item xs={3} sx={{ bgcolor: 'common.white' }}>
      <EmailItem
        key='one'
        {...{
          from: 'Michael Scout',
          date: 'yesterday',
          subject: 'Please, call me!',
          preview: 'We need to have a meet-up',
          isRead: false,
        }}
      />
      <EmailItem
        key='one'
        {...{
          from: 'Elizabeth Tailor',
          date: '13/09',
          subject: 'Please, call me again!',
          preview: 'We need to have a meet-up once more',
          isRead: false,
        }}
      />
    </Grid>
  )
}

export default EmailList
