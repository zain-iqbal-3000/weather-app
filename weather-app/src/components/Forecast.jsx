import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchForecast } from '../utils/api';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';

const weatherIcons = {
  Clear: <WbSunnyIcon sx={{ fontSize: 50 }} />,
  Clouds: <CloudIcon sx={{ fontSize: 50 }} />,
  Rain: <OpacityIcon sx={{ fontSize: 50 }} />,
  Snow: <ThermostatIcon sx={{ fontSize: 50 }} />,
  Wind: <AirIcon sx={{ fontSize: 50 }} />,
};

export default function Forecast({ city }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      const data = await fetchForecast(city);
      setForecast(data);
    };
    getForecast();
  }, [city]);

  if (!forecast) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '30px', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
      {forecast.list.slice(0, 5).map((day, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} style={{ marginBottom: '1rem' }}>
          <Card sx={{ padding: '10px', width: '300px', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                {new Date(day.dt_txt).toLocaleDateString()}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {weatherIcons[day.weather[0].main] || <CloudIcon sx={{ fontSize: 50, color: 'white' }} />}
              </Box>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                {day.main.temp}°C
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
                {day.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

Forecast.propTypes = {
  city: PropTypes.string.isRequired,
};