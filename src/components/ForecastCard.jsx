import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import WaterDrop from '@mui/icons-material/WaterDrop'
import Air from '@mui/icons-material/Air'
import WeatherIcon from './WeatherIcon'

export default function ForecastCard({ day, weatherTypes, windSpeeds, index }) {
  const wt = weatherTypes[day.idWeatherType]
  const ws = windSpeeds[day.classWindSpeed]
  const desc = wt ? wt.descWeatherTypeEN : 'Unknown'
  const windDesc = ws ? ws.descClassWindSpeedDailyEN : ''
  const date = new Date(day.forecastDate + 'T00:00:00')
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const dayNum = date.getDate()

  return (
    <Card
      className="forecast-card"
      sx={{
        animationDelay: `${(index || 0) * 80}ms`,
        flex: 1,
        textAlign: 'center',
        bgcolor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#fff',
        borderRadius: 2,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          bgcolor: 'rgba(255,255,255,0.14)',
        },
      }}
    >
      <CardContent
        sx={{
          px: 2,
          py: 2.5,
          '&:last-child': { pb: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Typography variant="overline" fontWeight={700} letterSpacing={1.5} sx={{ opacity: 0.8 }}>
          {weekday}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.5, display: 'block', mb: 1.5 }}>
          {date.toLocaleDateString('en-US', { month: 'short' })} {dayNum}
        </Typography>

        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          <WeatherIcon
            id={day.idWeatherType}
            sx={{ fontSize: 52, color: 'rgba(255,255,255,0.9)' }}
          />
        </Box>

        <Chip
          label={desc}
          size="small"
          sx={{
            mb: 1.5,
            bgcolor: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 500,
            fontSize: '0.7rem',
            height: 24,
            maxWidth: '100%',
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
            {Math.round(day.tMax)}°
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.5, fontWeight: 400 }}>
            {Math.round(day.tMin)}°
          </Typography>
        </Stack>

        <Stack direction="column" alignItems="center" spacing={0.5} sx={{ opacity: 0.7 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <WaterDrop sx={{ fontSize: 14 }} />
            <Typography variant="caption">{day.precipitaProb}%</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Air sx={{ fontSize: 14 }} />
            <Typography variant="caption">{day.predWindDir} {windDesc}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
