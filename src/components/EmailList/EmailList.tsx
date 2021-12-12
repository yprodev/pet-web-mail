import { FC } from 'react'
import Grid from '@mui/material/Grid'

import { EmailShort } from '../../interfaces'
import { EmailListItem } from '../'
import useEmailList from './useEmailList'

interface EmailListProps {}

const EmailList: FC<EmailListProps> = () => {
  const { emails, handleEmailDisplay } = useEmailList()

  return (
    <Grid item xs={3} sx={{ bgcolor: 'common.white', boxShadow: '1px 0 3px rgba(0, 0, 0, 0.1)' }}>
      {emails.map((email: EmailShort, idx: number) => (
        <EmailListItem
          handleClick={handleEmailDisplay}
          key={idx}
          identifier={email.id}
          isRead={email.meta.isRead}
          {...email.header}
        />
      ))}
    </Grid>
  )
}

export default EmailList
