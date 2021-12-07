import { FC } from 'react'
import Grid from '@mui/material/Grid'

import { Email } from '../../interfaces'
import EmailItem from '../EmailItem'
import useEmailList from './useEmailList'

interface EmailListProps {}

const EmailList: FC<EmailListProps> = () => {
  const { emails, handleEmailDisplay } = useEmailList()

  return (
    <Grid item xs={3} sx={{ bgcolor: 'common.white', boxShadow: '1px 0 3px rgba(0, 0, 0, 0.1)' }}>
      {emails.map((email: Email, idx: number) => (
        <EmailItem
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
