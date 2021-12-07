import { FC, useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import Grid from '@mui/material/Grid'

import { Email } from '../interfaces'
import { selectedFolder$ } from '../observables'
import { displayFullEmail, listSelectedEmails } from '../selectors'
import { EmailItem } from '.'

interface EmailListProps {}

const EmailList: FC<EmailListProps> = () => {
  const [emails, setEmails] = useState<Email[]>([])

  //TODO: useCallback
  const handleEmailDisplay = (emailId: string) => {
    displayFullEmail(emailId)
  }

  useEffect(() => {
    const componentDestroyed$ = new Subject<void>()

    listSelectedEmails(selectedFolder$, componentDestroyed$, setEmails)

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
  }, [])

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
