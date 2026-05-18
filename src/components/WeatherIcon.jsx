const ICON_BASE = 'https://www.ipma.pt/opencms/bin/icons/svg/weather/w_ic_d_'

export default function WeatherIcon({ id, sx }) {
  const padded = String(id).padStart(2, '0')
  return (
    <img
      src={`${ICON_BASE}${padded}.svg`}
      alt={`weather-${id}`}
      style={{ width: sx?.fontSize || 52, height: sx?.fontSize || 52 }}
    />
  )
}
