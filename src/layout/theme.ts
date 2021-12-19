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
    primary: {
      main: '#0654C9', // #0654C9, #263142, #21ECFC, #FD8960, #C91D06 - Compound
    },
    error: {
      main: '#C91D06',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
})

export default theme
