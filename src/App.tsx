import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import { theme } from './layout'
import { Aside } from './components'

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
        <Grid item xs={3} sx={{ outline: '1px solid red' }}>
          stack
        </Grid>
        <Grid item xs={7} sx={{ outline: '1px solid green' }}>
          view area
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
