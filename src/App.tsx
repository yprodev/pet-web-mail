import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import { theme } from './layout'
import { Aside, EmailList, ViewArea } from './components'
import { listEmails } from './service'
import { Subject } from 'rxjs'

function App() {
  //Move into a custom hook
  useEffect(() => {
    const componentDestroyed = new Subject<void>()

    listEmails(componentDestroyed)

    return () => {
      componentDestroyed.next()
      componentDestroyed.complete()
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
