import { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { fetchWeather } from './utils/api';
import { Container, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './index.css'
// import './App.css';

export default function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState('');

  const handleSearch = () => {
    setLocation(city);
  };


  useEffect(() => {
    const getWeather = async () => {
      
        const data = await fetchWeather(location);
        console.log(data);
        setWeather(data);
        chooseBackground(data);

      
    };
    getWeather();
  }, [location]);

  const chooseBackground = (weather) => {
      console.log('weather in chooseBackground in App.jsx');
      console.log(weather.weather[0].main);
      console.log('background before if else ' + background);
      // setBackground('clear-sky.jpg');


      if (weather.weather[0].main === 'clear-sky') {
        setBackground('clear-sky.jpg');
      }  else if (weather.weather[0].main === 'Clouds') {
        setBackground('broken-clouds.jpg');
      } else if (weather.weather[0].main === 'Rain') {
        setBackground('shower-rain.jpg');
      } else if (weather.weather[0].main === 'Snow') {
        setBackground('snow.jpg');
      } else if (weather.weather[0].main === 'Thunderstorm') {
        setBackground('thunderstorm.jpg');
      } else if (weather.weather[0].main === 'Mist') {
        setBackground('mist.jpg');
      } else if (weather.weather[0].main === 'Smoke') {
        setBackground('mist.jpeg'); 
      } else {
        setBackground('clear-sky.png');
      }
      console.log('background after if else : ' + background);
    };

  // if (!weather) return null;

  return (
    <Container sx={{ backgroundImage: `url(${background})` , backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' , minHeight: '100vh', minWidth: '100vw'}} >
      <Box sx={{ my: 0.5, display:'flex', flexDirection:'row', gap: '10px'}}>
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <>
        {location && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CurrentWeather city={location} weather={weather} />
          </motion.div>
        )}
      </>
      <>
        {location && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Forecast city={location} />
          </motion.div>
        )}
      </>
    </Container>
  );
}



































// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vitejs.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

