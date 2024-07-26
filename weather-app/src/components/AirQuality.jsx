import { useState, useEffect } from 'react';
import { fetchAirQuality } from '../utils/api';
import { Card, CardContent, Typography } from '@mui/material';

import PropTypes from 'prop-types';

export default function AirQuality({ lat, lon }){
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const getAirQuality = async () => {
      const data = await fetchAirQuality(lat, lon);
      setAirQuality(data);
    };
    getAirQuality();
  }, [lat, lon]);

  if (!airQuality) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Air Quality Index: {airQuality.list[0].main.aqi}</Typography>
      </CardContent>
    </Card>
  );
}

AirQuality.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
