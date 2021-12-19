import { useEffect } from 'react'
import { Subject, takeUntil } from 'rxjs'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import { setEmails } from './service'
import { emailsRequest$ } from './resource'
import { theme } from './layout'
import { Aside, EmailList, ViewArea } from './components'

function App() {
  useEffect(() => {
    const componentDestroyed$ = new Subject<void>()

    emailsRequest$()
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((emails) => setEmails(emails))

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          height: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Aside />
        <EmailList />
        <ViewArea />
      </Grid>
    </ThemeProvider>
  )
}

export default App
