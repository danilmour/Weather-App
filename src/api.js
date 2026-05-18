const BASE = 'https://api.ipma.pt/open-data'

export async function fetchCities() {
  const res = await fetch(`${BASE}/distrits-islands.json`)
  const json = await res.json()
  return json.data
}

export async function fetchWeatherTypes() {
  const res = await fetch(`${BASE}/weather-type-classe.json`)
  const json = await res.json()
  const map = {}
  for (const item of json.data) {
    map[item.idWeatherType] = item
  }
  return map
}

export async function fetchWindSpeeds() {
  const res = await fetch(`${BASE}/wind-speed-daily-classe.json`)
  const json = await res.json()
  const map = {}
  for (const item of json.data) {
    map[item.classWindSpeed] = item
  }
  return map
}

export async function fetchForecast(globalIdLocal) {
  const res = await fetch(`${BASE}/forecast/meteorology/cities/daily/${globalIdLocal}.json`)
  const json = await res.json()
  return json.data
}
