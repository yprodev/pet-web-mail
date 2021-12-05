import { createTheme, Theme } from '@mui/material/styles'

const theme: Theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontSize: 14,
    },
    body1: {
      fontSize: 12,
      lineHeight: '12px',
    },
  },
  palette: {
    background: {
      default: '#f5f5f6',
      paper: '#263142',
    },
    common: {
      white: '#ffffff',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
})

export default theme
