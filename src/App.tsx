import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import { theme } from './layout'
import { initRepositoryEmail } from './repository'
import { useObservable } from './hook'
import { Aside, EmailList, ViewArea } from './components'

function App() {
  const emailRepository = initRepositoryEmail()
  const emailState = useObservable(emailRepository.getEmailObservable())

  useEffect(() => {
    emailRepository.list()
  }, [])

  console.log('email state', emailState)

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
