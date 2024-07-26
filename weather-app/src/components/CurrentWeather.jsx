import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';

export default function CurrentWeather({ city, weather }) {
  if (!weather) return null;

  const weatherIcons = {
    Clear: <WbSunnyIcon sx={{ fontSize: 100, color: 'yellow' }} />,
    Clouds: <CloudIcon sx={{ fontSize: 100, color: 'gray' }} />,
    Smoke: <CloudIcon sx={{ fontSize: 100, color: 'gray' }} />, // Use CloudIcon for Smoke
    // Add more weather conditions as needed
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
  <CardContent>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {weatherIcons[weather.weather[0].main] || <WbSunnyIcon sx={{ fontSize: 100, color: 'yellow' }} />}
      <Typography variant="h2" sx={{ color: 'white' }}>
        <strong>{weather.name}</strong>
      </Typography>
      <Typography variant="h2" sx={{ color: 'white' }}>
        <strong>{weather.main.temp}°C</strong>
      </Typography>
      <Typography variant="h5" sx={{ color: 'white' }}>
        <strong>{weather.weather[0].description}</strong>
      </Typography>
    </Box>
    <Grid container spacing={0} sx={{ marginTop: '20px', display:'flex', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <ThermostatIcon sx={{ fontSize: 50 }} />
          <Typography variant="h6">
            <strong>Feels Like:</strong> {weather.main.feels_like}°C
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <OpacityIcon sx={{ fontSize: 50 }} />
          <Typography variant="h6">
            <strong>Humidity:</strong> {weather.main.humidity}%
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <AirIcon sx={{ fontSize: 50 }} />
          <Typography variant="h6">
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </CardContent>
</Card>
  );
}

CurrentWeather.propTypes = {
  weather: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
};