import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function CitySelector({ cities, selected, onSelect }) {
  const value = cities.find((c) => c.globalIdLocal === Number(selected)) || null

  return (
    <Autocomplete
      options={cities}
      value={value}
      onChange={(_, newVal) => onSelect(newVal ? newVal.globalIdLocal : null)}
      getOptionLabel={(option) => option.local}
      isOptionEqualToValue={(a, b) => a.globalIdLocal === b.globalIdLocal}
      renderInput={(params) => (
        <TextField {...params} label="Select a city" variant="outlined" />
      )}
      sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}
    />
  )
}
