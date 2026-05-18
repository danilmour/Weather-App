import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Cloud from '@mui/icons-material/Cloud'

import { fetchCities, fetchWeatherTypes, fetchWindSpeeds, fetchForecast } from './api'
import CitySelector from './components/CitySelector'
import ForecastCard from './components/ForecastCard'

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

function SkeletonGrid() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <Box key={i} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Skeleton variant="text" width="60%" sx={{ mx: 'auto', mb: 0.5 }} />
          <Skeleton variant="text" width="40%" sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="circular" width={52} height={52} sx={{ mx: 'auto', mb: 1.5 }} />
          <Skeleton variant="rounded" width={80} height={24} sx={{ mx: 'auto', mb: 1.5 }} />
          <Skeleton variant="text" width="50%" sx={{ mx: 'auto', mb: 0.5 }} />
          <Skeleton variant="text" width="70%" sx={{ mx: 'auto' }} />
        </Box>
      ))}
    </Box>
  )
}

export default function App() {
  const [cities, setCities] = useState([])
  const [weatherTypes, setWeatherTypes] = useState({})
  const [windSpeeds, setWindSpeeds] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForecast, setShowForecast] = useState(false)

  useEffect(() => {
    Promise.all([fetchCities(), fetchWeatherTypes(), fetchWindSpeeds()])
      .then(([c, wt, ws]) => {
        setCities(c.filter(item => item.globalIdLocal))
        setWeatherTypes(wt)
        setWindSpeeds(ws)
      })
      .catch(() => setError('Failed to load city data'))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    setLoading(true)
    setShowForecast(false)
    setError(null)
    fetchForecast(selectedId)
      .then((data) => {
        setForecast(data)
        setLoading(false)
        requestAnimationFrame(() => setShowForecast(true))
      })
      .catch(() => {
        setError('Failed to load forecast')
        setLoading(false)
      })
  }, [selectedId])

  const selectedCity = cities.find((c) => c.globalIdLocal === Number(selectedId))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'rgba(15, 25, 50, 0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar>
          <Cloud sx={{ mr: 1.5, opacity: 0.8 }} />
          <Typography variant="h6" fontWeight={600} letterSpacing={0.5}>
            Portugal Weather
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(145deg, #0b142f 0%, #1a2d5a 40%, #2d5f8a 100%)',
          pt: 12,
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" fontWeight={700} sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              5-Day Forecast
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.6, mt: 0.5 }}>
              Weather data provided by IPMA
            </Typography>
          </Box>

          <CitySelector cities={cities} selected={selectedId} onSelect={setSelectedId} />

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{error}</Alert>
          )}

          {loading && (
            <SkeletonGrid />
          )}

          {selectedCity && !loading && forecast.length > 0 && (
            <Box
              className={showForecast ? 'fade-in' : ''}
              sx={{ opacity: showForecast ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
              <Typography variant="h5" fontWeight={600} textAlign="center" sx={{ mb: 3 }}>
                {selectedCity.local}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {forecast.map((day, i) => (
                  <ForecastCard
                    key={day.forecastDate}
                    day={day}
                    weatherTypes={weatherTypes}
                    windSpeeds={windSpeeds}
                    index={i}
                  />
                ))}
              </Box>
            </Box>
          )}

          {selectedCity && !loading && forecast.length === 0 && !error && (
            <Typography textAlign="center" sx={{ py: 4, opacity: 0.6 }}>
              No forecast data available for this location.
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}
