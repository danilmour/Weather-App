import WbSunny from '@mui/icons-material/WbSunny'
import WbCloudy from '@mui/icons-material/WbCloudy'
import Cloud from '@mui/icons-material/Cloud'
import WaterDrop from '@mui/icons-material/WaterDrop'
import Thunderstorm from '@mui/icons-material/Thunderstorm'
import AcUnit from '@mui/icons-material/AcUnit'
import Grain from '@mui/icons-material/Grain'
import Foggy from '@mui/icons-material/Foggy'

const ICON_MAP = {
  1: WbSunny,
  2: WbCloudy,
  3: WbCloudy,
  4: Cloud,
  5: Cloud,
  6: WaterDrop,
  7: WaterDrop,
  8: WaterDrop,
  9: WaterDrop,
  10: WaterDrop,
  11: WaterDrop,
  12: WaterDrop,
  13: WaterDrop,
  14: WaterDrop,
  15: WaterDrop,
  16: Foggy,
  17: Foggy,
  18: AcUnit,
  19: Thunderstorm,
  20: Thunderstorm,
  21: Grain,
  22: AcUnit,
  23: Thunderstorm,
  24: Cloud,
  25: WbCloudy,
  26: Foggy,
  27: Cloud,
  28: AcUnit,
  29: AcUnit,
  30: AcUnit,
}

export default function WeatherIcon({ id, sx }) {
  const Icon = ICON_MAP[id] || WbSunny
  return <Icon sx={sx} />
}
