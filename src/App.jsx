import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import QueryInput from './components/QueryInput'
import QueryHistory from './components/QueryHistory'
import ResultsDisplay from './components/ResultsDisplay'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <h1>AI Analytics Dashboard</h1>
          <QueryInput />
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Box sx={{ flex: 1 }}>
              <QueryHistory />
            </Box>
            <Box sx={{ flex: 2 }}>
              <ResultsDisplay />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App