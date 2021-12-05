import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { theme } from './layout'
import { Aside } from './components'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Aside />
    </ThemeProvider>
  )
}

export default App
