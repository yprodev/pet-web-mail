import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import { theme } from './layout'
import { Aside, EmailList, ViewArea } from './components'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{
          bgcolor: 'background.paper',
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
