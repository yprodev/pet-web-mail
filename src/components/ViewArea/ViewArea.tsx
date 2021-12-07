import { FC, useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import Grid from '@mui/material/Grid'

import { EmailFull } from '../../interfaces'
import { selectedEmail$ } from '../../observables'
import { ViewAreaToolbar } from '../'

interface ViewAreaProps {}

const ViewArea: FC<ViewAreaProps> = () => {
  const componentDestroyed$ = new Subject<void>()
  const [fullEmail, setFullEmail] = useState<EmailFull>()

  useEffect(() => {
    selectedEmail$
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((emailFull: EmailFull) => setFullEmail(emailFull))

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid item xs={7} sx={{ bgcolor: 'Background.default' }}>
      <ViewAreaToolbar />
      <pre>{JSON.stringify(fullEmail, null, 2)}</pre>
    </Grid>
  )
}

export default ViewArea
